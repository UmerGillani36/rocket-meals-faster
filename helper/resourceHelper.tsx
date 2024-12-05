import React from 'react';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { Foodoffers, FoodsCategoriesTranslations, FoodsFeedbacksLabelsTranslations, FoodsTranslations } from '@/constants/types';
import { languageCode } from '@/constants/Constants';

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
}

const getTextFromTranslation = (translations: Array<Translation>): string => {
    if (!translations || translations.length === 0) return '';
    const translation = translations.find((t) => t.languages_code === languageCode);
    return translation?.text || translation?.name || '';
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

export { getIconComponent, getTextFromTranslation, extractFoodDetails };
