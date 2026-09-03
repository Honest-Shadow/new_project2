import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="dashboard">
            <div className="dash-header">
                <div className="logo">AccountHub</div>
                <nav>
                    <Link to="/dashboard" className="active">Dashboard</Link>
                    <Link to="/settings" className="active">Settings</Link>
                    <button onClick={logout} className="logout">Logout</button>
                </nav>
            </div>
            <div className="dash-body">
                <div className="welcome">
                    <h1>Welcome back, {user?.name}</h1>
                    <p>Here's an overview of your account</p>
                </div>
                <div className="dash-cards">
                    <div className="card">
                        <p>EMAIL</p>
                        <h1>{user?.email}</h1>
                    </div>
                    <div className="card">
                        <p>MEMBER SINCE</p>
                        <h1>Just now</h1>
                    </div>
                    <div className="card">
                        <p>ACCOUNT STATUS</p>
                        <h1 style={{color: "green"}}>Active</h1>
                    </div>
                </div>
                <div className="quick-action">
                    <h1>Quick Actions</h1>
                    <div className="quick-actions">
                        <Link to="/settings" className="active1">Edit Profile</Link>
                        <Link to="/settings" className="active1">Change Password</Link>
                    </div>
                </div>
            </div>
        </div>
    )
       
};

export default Dashboard;