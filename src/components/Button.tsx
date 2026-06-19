import { Pressable, Text } from 'react-native';

type Props = {
  title: string;
};

export default function Button({ title }: Props) {
  return (
    <Pressable>
      <Text>{title}</Text>
    </Pressable>
  );
}