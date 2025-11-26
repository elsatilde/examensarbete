import { TextInput, TextInputProps  } from 'react-native'
import React from 'react'
import { colors } from '../variables/colors'

interface ThemedTextInputProps extends TextInputProps {
    style?: object;
    placeholder?: string;
    keyboardType?: TextInputProps['keyboardType'];
}

const ThemedTextInput: React.FC<ThemedTextInputProps> = ({ style, ...props }) => {
  return (
    <TextInput
        style={[
            {
                backgroundColor: colors.muted,
                color: colors.text,
                padding: 20,
                borderRadius: 6
            }, style ]}
        {...props} 
    />
  
  )
}

export default ThemedTextInput

