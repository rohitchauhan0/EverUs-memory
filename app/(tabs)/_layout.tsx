import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Home from './home';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window'); // Get screen width for centering

const CustomAddButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.addButton}>
    <Ionicons name="add" size={32} color="white" />
  </TouchableOpacity>
);

const Layout = () => {
  const router = useRouter();

  return (
    <Tab.Navigator
    initialRouteName='home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
         <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarButton: () => null, // ❌ Hide tab icon for Home
        }}
      />
      <Tab.Screen
        name="add"
        component={View} // Placeholder screen
        options={{
          tabBarButton: (props) => <CustomAddButton {...props} onPress={() => router.push('/(posts)/post')} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Layout;

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    elevation: 10,
    flexDirection: 'row',
    justifyContent: 'center', // Ensure centering
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 0, // Distance from the bottom
    left: (width - 450) / 2, // Centers button (70px is button width)
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#FF914D',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.5,
    elevation: 5,
  },
  
  
});
