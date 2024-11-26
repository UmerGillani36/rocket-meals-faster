import { useTheme } from '@/context/ThemeContext';
import { Stack } from 'expo-router';

export default function FoodOfferLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: theme.header.background },
        headerTintColor: theme.header.text,
      }}
    >
      <Stack.Screen
        name='index'
        options={{ title: 'Food Offers', headerShown: true }}
      />
      <Stack.Screen
        name='details/[id]'
        options={{ title: 'Food Details', headerBackTitle: 'Back' }}
      />
    </Stack>
  );
}
