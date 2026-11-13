import React from 'react';
import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

interface ScreenContentProps {
  title: string;
  path: string;
  children?: React.ReactNode;
}

export const ScreenContent: React.FC<ScreenContentProps> = ({ title, path, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};

const styles = {
  container: { alignItems: 'center' as const, flex: 1, justifyContent: 'center' as const, backgroundColor: '#ffffff' },
  separator: { height: 1, marginVertical: 28, width: '80%' as const, backgroundColor: '#e5e7eb' },
  title: { fontSize: 20, fontWeight: 'bold' as const },
};
