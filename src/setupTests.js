// Configure enzyme to use the correct adapter for the react version
doMocks();

function doMocks() {
  jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
  jest.mock('react-native-safe-area-context', () => {
    return {
      useSafeAreaInsets: () => {
        return {
          bottom: 50,
        };
      },
    };
  });

  jest.mock('@react-navigation/native', () => {
    return {
      ...jest.requireActual('@react-navigation/native'),
      useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
      }),
    };
  });
}
