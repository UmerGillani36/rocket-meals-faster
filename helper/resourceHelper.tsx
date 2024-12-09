import React from 'react';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Foodoffers, Foods, FoodsCategoriesTranslations, FoodsFeedbacksLabelsTranslations, FoodsTranslations } from '@/constants/types';
import { languageCode } from '@/constants/Constants';
import { StringHelper } from './stringHelper';

export type TranslationEntry = {
    languages_code: string,
    [key: string]: any
}

const getIconComponent = (iconString: string, iconColor: string): JSX.Element | null => {

    if (!iconString) return null;

    const [library, iconName] = iconString.split(':') as [string, any];

    if (library === 'MaterialCommunityIcons') {
        return <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />;
    } else if (library === 'MaterialIcons') {
        return <MaterialIcons name={iconName} size={24} color={iconColor} />;
    } else if (library === 'FontAwesome') {
        return <FontAwesome name={iconName} size={24} color={iconColor} />;
    } else {
        console.warn(`Icon library "${library}" is not supported`);
        return null;
    }
};

interface Translation {
    languages_code: string;
    text?: string;
    name?: string;
    description?: string;
}

const getTextFromTranslation = (translations: Array<Translation>): string => {
    if (!translations || translations.length === 0) return '';
    const translation = translations.find((t) => t.languages_code === languageCode);
    return translation?.text || translation?.name || '';
};

const getDescriptionFromTranslation = (translations: Array<Translation>): string => {
    if (!translations || translations.length === 0) return '';
    const translation = translations.find((t) => t.languages_code === languageCode);
    return translation?.description || '';
};

const extractFoodDetails = (food: Foodoffers) => {
    const {
        fat_g,
        protein_g,
        saturated_fat_g,
        sugar_g,
        carbohydrate_g,
        calories_kcal,
        fiber_g,
        salt_g,
    } = food;

    // Return the extracted details in a structured way
    return JSON.parse(JSON.stringify({
        fat_g,
        protein_g,
        saturated_fat_g,
        sugar_g,
        carbohydrate_g,
        calories_kcal,
        fiber_g,
        salt_g,
    }));
};

const DEFAULT_LANGUAGE_CODE_GERMAN = 'de-DE';
const FALLBACK_LANGUAGE_CODE_ENGLISH = 'en-US';
const MISSING_TRANSLATION = 'Missing translation';


export function getDirectusTranslation(languageCode: string, translations: TranslationEntry[], field: string, ignoreFallbackLanguage?: boolean, fallback_text?: string | null | undefined, params?: any): string {
    const translationDict = getLanguageDict(translations);

    type TranslationDict = { [key: string]: TranslationEntry };

    function getLanguageDict(translations: TranslationEntry[]) {
        const translationDict: TranslationDict = {};
        if (!!translations && translations.length > 0) {
            for (const translation of translations) {
                translationDict[translation?.languages_code] = translation;
            }
        }
        return translationDict;
    }

    function getTranslation(translationDict: TranslationDict, languages_code: string, params?: any) {
        const translationEntry = translationDict[languages_code];
        if (!translationEntry) {
            return null;
        }
        let translation = translationEntry[field]
        if (params) {
            const paramKeys = Object.keys(params);
            for (let i = 0; i < paramKeys.length; i++) {
                const paramKey = paramKeys[i];
                const paramValue = params[paramKey];
                translation = StringHelper.replaceAll(translation, '%' + paramKey, paramValue);
            }
        }
        return translation;
    }

    const translation = getTranslation(translationDict, languageCode, params);
    if (translation) {
        return translation
    }

    // First fallback language
    let default_language_code = FALLBACK_LANGUAGE_CODE_ENGLISH;
    let fallback_translation = getTranslation(translationDict, default_language_code, params);
    if (!!fallback_translation && !ignoreFallbackLanguage) { //TODO: maybe allow an user to set a proposal for his language
        return fallback_translation
    }

    // Second fallback language
    default_language_code = DEFAULT_LANGUAGE_CODE_GERMAN;
    fallback_translation = getTranslation(translationDict, default_language_code, params);
    if (!!fallback_translation && !ignoreFallbackLanguage) { //TODO: maybe allow an user to set a proposal for his language
        return fallback_translation
    }

    if (fallback_text !== undefined && fallback_text !== null) {
        return fallback_text;
    }

    return MISSING_TRANSLATION + "(" + field + ")";
}


const MAX_RATING = 5;
const MIN_RATING = 1;
const MINIMUM_RATING_AS_FAVORITE = (MAX_RATING + MIN_RATING) / 2;

export function isRatingPositive(rating: number | null | undefined): boolean {
    console.log('Rating', rating)
    return rating !== null && rating !== undefined && rating >= MINIMUM_RATING_AS_FAVORITE;
}

export function isRatingNegative(rating: number | null | undefined): boolean {
    return rating !== null && rating !== undefined && rating < MINIMUM_RATING_AS_FAVORITE;
}

export function getFoodName(food: string | Foods | null | undefined, languageCode: string) {
    if (typeof food === 'object' && food !== null) {
        let translations = food.translations as TranslationEntry[]
        if (translations) {
            let translation = getDirectusTranslation(languageCode, translations, 'name', false, food.alias, undefined);
            if (translation) {
                // capitalize first letter
                translation = translation.charAt(0).toUpperCase() + translation.slice(1);
                return translation;
            }
        }

        if (food?.alias) {
            // capitalize first letter
            return food.alias.charAt(0).toUpperCase() + food.alias.slice(1);
            //return food.alias
        }
    }
    return null;
}

export { getIconComponent, getTextFromTranslation, extractFoodDetails, getDescriptionFromTranslation };
