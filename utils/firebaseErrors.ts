// Easier error messages

export function getFirebaseErrorMessage(code: string) {
    switch (code) {
        case 'auth/invalid-email':
            return 'Invalid email';
        case 'auth/user-disabled':
            return 'User disabled';
        case 'auth/user-not-found':
            return 'No user with this e-mail';
        case 'auth/wrong-password':
            return 'Wrong password';
        case 'auth/email-already-in-use':
            return 'E-mail already exists';
        case 'auth/weak-password':
            return 'Password too short, enter at least 6 characters';
        default:
            return 'Something went wrong, try again';

    }
}