import { Text, View } from 'react-native';

interface EditScreenInfoProps {
  path: string;
}

export const EditScreenInfo: React.FC<EditScreenInfoProps> = ({ path }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text style={styles.getStartedText}>{title}</Text>
        <View style={styles.codeHighlightContainer}>
          <Text>{path}</Text>
        </View>
        <Text style={styles.getStartedText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: { borderRadius: 6, paddingHorizontal: 4 },
  getStartedContainer: { alignItems: 'center' as const, marginHorizontal: 48 },
  getStartedText: { fontSize: 18, lineHeight: 24, textAlign: 'center' as const },
  homeScreenFilename: { marginVertical: 8 },
};
