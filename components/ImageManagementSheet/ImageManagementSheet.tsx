import { ActivityIndicator, Alert, Platform, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './styles';
import { isWeb } from '@/constants/Constants';
import { useTheme } from '@/hooks/useTheme';
import { ImageManagementSheetProps } from './types';
import usePlatformHelper from '@/helper/platformHelper';
import { ServerAPI } from '@/redux/actions';
import { uploadFiles } from '@directus/sdk';
import { CollectionHelper } from '@/helper/collectionHelper';

const ImageManagementSheet: React.FC<ImageManagementSheetProps> = ({
  closeSheet,
  selectedFoodId,
  handleFetch,
}) => {
  const { theme } = useTheme();
  const [loading, setLoading] = useState({ image: false, delete: false });
  const [isDelete, setIsDelete] = useState(false);
  const MAX_IMAGE_DIMENSION = 6000;

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  //   const { isWeb } = usePlatformHelper();

  const handleImagePick = async (useCamera: boolean) => {
    try {
      const permissionResponse = useCamera
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResponse.granted) {
        Alert.alert(
          'Permission Denied',
          'Please grant permissions to access the camera or gallery.'
        );
        return;
      }

      const pickerResult = useCamera
        ? await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          allowsMultipleSelection: false,
          selectionLimit: 1,
          quality: 1,
        })
        : await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          allowsMultipleSelection: false,
          selectionLimit: 1,
          quality: 1,
        });

      if (pickerResult.canceled) {
        Alert.alert('Canceled the image');
        return;
      }

      const { uri, width, height } = pickerResult.assets[0];
      let finalUri = uri;

      if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
        const aspectRatio = width / height;
        const newDimensions =
          width > height
            ? {
              width: MAX_IMAGE_DIMENSION,
              height: MAX_IMAGE_DIMENSION / aspectRatio,
            }
            : {
              width: MAX_IMAGE_DIMENSION * aspectRatio,
              height: MAX_IMAGE_DIMENSION,
            };

        const resizedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: newDimensions }],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );

        finalUri = resizedImage.uri;
      }
      setLoading({ ...loading, image: true });
      const formData = new FormData();
      const file_name = 'foods_' + selectedFoodId;
      let fileSizes: number | undefined = undefined;

      if (Platform.OS === 'web') {
        const blob: Blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            console.log(e);
            reject(new TypeError('Network request failed'));
          };
          xhr.responseType = 'blob';
          xhr.open('GET', finalUri, true);
          xhr.send(null);
        });

        fileSizes = blob.size;
        formData.append('image', blob);
      } else {
        const uriParts = finalUri.split('.');
        const fileType = uriParts[uriParts.length - 1];
        const fileExtension = `.${fileType}`;

        const file: any = {
          uri: finalUri,
          name: file_name + fileExtension,
          type: `image/${fileType}`,
        };
        formData.append('image', file);

        const response = await fetch(finalUri);
        const blob = await response.blob();
        fileSizes = blob.size;
      }

      const client = ServerAPI.getClient();
      formData.append('title', file_name);

      const resultFileUpload = await client.request(uploadFiles(formData));

      const file_id = resultFileUpload.id;

      const collectionHelper = new CollectionHelper('foods');
      let resultImageLinked = await collectionHelper.updateItem(
        selectedFoodId,
        {
          image: file_id,
        }
      );
      handleFetch();
      setLoading({ ...loading, image: false });
      closeSheet();
    } catch (error) {
      console.error('Error selecting image:', error);
      setLoading({ ...loading, image: false });
      // Alert.alert('Error', 'An error occurred while selecting the image.');
    }
  };

  const handleDeleteImage = async () => {
    try {
      const collectionHelper = new CollectionHelper('foods');
      setLoading({ ...loading, delete: true });
      let result = await collectionHelper.updateItem(selectedFoodId, {
        image: null,
        image_remote_url: null
      })
      handleFetch();
      closeSheet();
      setLoading({ ...loading, delete: false });
    } catch (error) {
      console.error('Error deleting image:', error);
      setLoading({ ...loading, delete: false });
    }
  }

  return (
    <BottomSheetScrollView
      style={{ ...styles.sheetView, backgroundColor: theme.sheet.sheetBg }}
      contentContainerStyle={styles.contentContainer}
    >
      <View
        style={{
          ...styles.sheetHeader,
          paddingRight: isWeb ? 10 : 0,
          paddingTop: isWeb ? 10 : 0,
        }}
      >
        <View />
        <Text
          style={{
            ...styles.sheetHeading,
            color: theme.sheet.text,
          }}
        >
          Edit: Image
        </Text>
        <TouchableOpacity
          style={{
            ...styles.sheetcloseButton,
            backgroundColor: theme.sheet.closeBg,
          }}
          onPress={() => {
            setIsDelete(false);
            setSelectedImage(undefined);
            closeSheet();
          }}
        >
          <AntDesign name='close' size={24} color={theme.sheet.closeIcon} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.mainContentContainer,
          width: isWeb ? '90%' : '100%',
        }}
      >
        {isDelete ? (
          <>
            <TouchableOpacity
              style={{ ...styles.row, backgroundColor: theme.background }}
              onPress={handleDeleteImage}
            >
              <View style={styles.col}>
                <MaterialCommunityIcons
                  name='delete'
                  size={24}
                  color={theme.screen.icon}
                />
                <Text style={{ ...styles.label, color: theme.screen.text }}>
                  Delete
                </Text>
              </View>
              {
                loading?.delete ? <ActivityIndicator size='small' color={theme.screen.icon} /> :
                  <MaterialCommunityIcons
                    name='checkbox-blank-circle-outline'
                    size={24}
                    color={theme.screen.icon}
                  />
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.row, backgroundColor: theme.background }}
              onPress={() => {
                setIsDelete(false);
                closeSheet();
              }}
            >
              <View style={styles.col}>
                <MaterialCommunityIcons
                  name='close'
                  size={24}
                  color={theme.screen.icon}
                />
                <Text style={{ ...styles.label, color: theme.screen.text }}>
                  Cancel
                </Text>
              </View>
              <MaterialCommunityIcons
                name='checkbox-blank-circle-outline'
                size={24}
                color={theme.screen.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.row, backgroundColor: theme.background }}
              onPress={() => setIsDelete(false)}
            >
              <View style={styles.col}>
                <MaterialCommunityIcons
                  name='keyboard-backspace'
                  size={24}
                  color={theme.screen.icon}
                />
                <Text style={{ ...styles.label, color: theme.screen.text }}>
                  Navigate back
                </Text>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={{ ...styles.row, backgroundColor: theme.background }}
              onPress={() => handleImagePick(false)}
            >
              <View style={styles.col}>
                <MaterialCommunityIcons
                  name='folder-image'
                  size={24}
                  color={theme.screen.icon}
                />
                <Text style={{ ...styles.label, color: theme.screen.text }}>
                  Gallery
                </Text>
              </View>
              {
                loading?.image ? <ActivityIndicator size='small' color={theme.screen.icon} /> :
                  <MaterialCommunityIcons
                    name='checkbox-blank-circle-outline'
                    size={24}
                    color={theme.screen.icon}
                  />
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.row, backgroundColor: theme.background }}
              onPress={() => setIsDelete(true)}
            >
              <View style={styles.col}>
                <MaterialCommunityIcons
                  name='delete'
                  size={24}
                  color={theme.screen.icon}
                />
                <Text style={{ ...styles.label, color: theme.screen.text }}>
                  Delete
                </Text>
              </View>
              <MaterialCommunityIcons
                name='arrow-right'
                size={24}
                color={theme.screen.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...styles.row, backgroundColor: theme.background }}
              onPress={closeSheet}
            >
              <View style={styles.col}>
                <MaterialCommunityIcons
                  name='close'
                  size={24}
                  color={theme.screen.icon}
                />
                <Text style={{ ...styles.label, color: theme.screen.text }}>
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
          </>
        )}
      </View>
    </BottomSheetScrollView>
  );
};

export default ImageManagementSheet;
