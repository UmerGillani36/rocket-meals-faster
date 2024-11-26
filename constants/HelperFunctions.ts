import { UPDATE_LOGIN } from '@/redux/Types/types';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';



  export const generateCodeVerifier = async () => {
    const bytesMinAmount = 32;
    const bytesMaxAmount = 96;
    const bytesAmount = bytesMinAmount;
    const printableAsciiStart = 33; // ASCII value of '!'
    const printableAsciiEnd = 126; // ASCII value of '~'
    const printableAsciiRange = printableAsciiEnd - printableAsciiStart + 1; // Calculate the range

    const array = await Crypto.getRandomBytesAsync(bytesAmount); // Generates 32 random bytes
    return Array.from(array, (byte) =>
      String.fromCharCode(printableAsciiStart + (byte % printableAsciiRange))
    ).join('');
  };

  // Generate a code challenge using the S256 method
  export const generateCodeChallenge = async (codeVerifier: string) => {
    const digest = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      codeVerifier,
      {encoding: Crypto.CryptoEncoding.BASE64}
    );
    // Adjust the base64url encoding
    return digest.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  };

  // Update the login status
  export const updateLoginStatus = async (dispatch: any) => {
    dispatch({ type: UPDATE_LOGIN, payload: true });
  }

  // Check if the app is running on GitHub Pages
  export function isOnGithubPages() {
		if(Platform.OS === 'web'){
			if(window.location.origin.includes('github.io')){
				return true;
			}
		}
		return false;
	}

  	// TODO: Workaround Expo Issue: https://github.com/expo/expo/issues/29274
	export function reloadAndRemoveParamsForGithubPages() {
		window.location.replace(window.location.origin + window.location.pathname);
	}

  // export const cacheHelperDeepFields_buildings: MyCacheHelperDeepFields = new MyCacheHelperDeepFields([
  //   {
  //     field: '*',
  //     limit: -1,
  //     dependency_collections_or_enum: [TABLE_NAME_BUILDINGS],
  //   },
  //   {
  //     field: 'translations.*',
  //     limit: -1,
  //     dependency_collections_or_enum: ["buildings_translations"],
  //   },
  //   {
  //     field: 'businesshours.*',
  //     limit: -1,
  //     dependency_collections_or_enum: ["buildings_businesshours"],
  //   }
  // ])