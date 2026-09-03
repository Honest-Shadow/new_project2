import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
    const { user, updateProfile, updatePassword, logout } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');

    const [profileMessage, setProfileMessage] = useState('');
    const [profileError, setProfileError] = useState('');
    const [profileLoading, setProfileLoading] = useState(false);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileError('');
        setProfileMessage('');
        setProfileLoading(true);

        try {
            await updateProfile(name, email);
            setProfileMessage('Profile updated successfully');
        } catch (error) {
            setProfileError(error.message);
        } finally {
            setProfileLoading(false);
        }
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordError('');
        setPasswordMessage('');

        if (newPassword !== confirmPassword) {
            setPasswordError('New Password and Confirm Password do not match.');
            return;
        }

        setPasswordLoading(true);

        try {
            await updatePassword(currentPassword, newPassword);
            setPasswordMessage('Password updated successfully');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setPasswordError(error.message);
        } finally {
            setPasswordLoading(false);
        }
    }

    return(
        <div className="settings">
            <div className="set-body">
                <h1>Settings</h1>

                <form onSubmit={handleProfileSubmit}>
                    <h1>Update Profile</h1>
                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <button type="submit" disabled={profileLoading}>{profileLoading ? 'Updating...' : 'Update'}</button>
                </form>

                {profileMessage && <p>{profileMessage}</p>}
                {profileError && <p>{profileError}</p>}


                <form onSubmit={handlePasswordSubmit}>
                    <h1>Update Password</h1>
                    <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit" disabled={passwordLoading}>{passwordLoading ? 'Updating...' : 'Update'}</button>
                </form>

                    {passwordMessage && <p>{passwordMessage}</p>}
                    {passwordError && <p>{passwordError}</p>}
            </div>
        </div>
    )
}

export default Settings;