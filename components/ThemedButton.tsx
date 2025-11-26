import { Pressable, StyleSheet, PressableProps } from 'react-native'
import { colors } from '../variables/colors'

interface ThemedButtonProps extends PressableProps {
  style?: object; 
}

function ThemedButton({ style, ...props }: ThemedButtonProps) {
  return (
    <Pressable 
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]} 
      {...props}
    />
  )
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.iconColor,
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    marginTop: 20,
  },
  pressed: {
    opacity: 0.5
  },
})

export default ThemedButton