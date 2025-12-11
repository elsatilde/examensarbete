import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../variables/colors";

interface PopUpModalProps {
    visible: boolean,
    onClose: () => void,
    children: React.ReactNode,
}

export default function PopUpModal({visible, onClose, children }: PopUpModalProps) {
    return (
        <Modal transparent visible={visible} animationType='fade' onRequestClose={onClose}>
            <View style={styles.overlay}>
                <TouchableOpacity style={styles.overlayTouchable} onPress={onClose} />
                <View style={styles.card}>
                    {children}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlayTouchable: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
    },
    card: {
        width: '90%',
        backgroundColor: colors.background,
        padding: 20,
        borderRadius: 16,
    }
})