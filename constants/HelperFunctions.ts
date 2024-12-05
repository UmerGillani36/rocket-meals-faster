import { UPDATE_LOGIN } from '@/redux/Types/types';
import * as Crypto from 'expo-crypto';
import { Platform } from 'react-native';
import { DirectusUsers } from './types';
import Server from './ServerUrl';
import { NumberHelper } from '@/helper/numberHelper';
import { StringHelper } from '@/helper/stringHelper';

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
  export const updateLoginStatus = async (dispatch: any, payload: DirectusUsers) => {
    dispatch({ type: UPDATE_LOGIN, payload });
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

  export const excerpt = (text: string, length: number) => {
    if (!text) {
      return '';
    }
    return text.length > length ? text.substring(0, length) + '...' : text;
  };

  export const numToOneDecimal = (num: number) => {
    return Math.round(num * 10) / 10;
  }

 export const getImageUrl = (imageId: string) => {
    if (!imageId) {
      return null;
    }
    return `${Server.ServerUrl}/assets/${imageId}?fit=cover&width=512&height=512&quality=100`;
  }

  // Helper function to filter out null or undefined values
export const filterNullishProperties = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value != null) // value != null filters out both null and undefined
  );
};

export function formatFoodInformationValue(
  value: string | number | null | undefined, 
  unit: string | null | undefined
): string | null {
  // If the value is not found, return null early
  if (!value) return null;

  // If value is a number, format it; otherwise, treat it as a string
  let valueWithUnit: string = "";

  if (typeof value === "number") {
    // Assuming NumberHelper.formatNumber handles null/undefined unit gracefully
    valueWithUnit = NumberHelper.formatNumber(value, unit, false, ",", ".", 1);
  } else {
    // If value is not a number, convert it to string
    valueWithUnit = String(value);

    // Append the unit if it's provided
    if (unit) {
      valueWithUnit += StringHelper.NONBREAKING_HALF_SPACE + unit;
    }
  }

  return valueWithUnit;
}

export const getpreviousFeedback = (feedbacks: any, foodId: string) => {
  const feedback = feedbacks.filter((feedback: any) => feedback.food === foodId);
  if (feedback.length > 0) {
    return feedback[0];
  } else {
    return {};
  }
}

export const getFoodOffer = (foodOffers: any, offerId: string) => {
  const foodOffer = foodOffers.filter((offer: any) => offer.id === offerId);
  if (foodOffer.length > 0) {
    return foodOffer[0];
  } else {
    return {};
  }
}

export const showPrice = (item: any, profile: any) => {
  if (profile?.price_group === 'guest') { 
    return item?.price_guest?.toFixed(2) + ' €';
  } else if (profile?.price_group === 'employee') {
    return item?.price_employee?.toFixed(2) + ' €';
  } else {
    return item?.price_student?.toFixed(2) + ' €'; 
  }
}

