import React from "react";
import { Link } from "react-router-dom";
const Dashboard = () => {
    return (
        <div>
            <h1> this is dashbaord</h1>
            <Link to="/Coin"> Coin </Link>
            <Link to="/marketplace"> Marketplace</Link>
            <Link to="/inventory"> Inventory</Link>
            <Link to="/boxer-king"> BoxerKing</Link>
        </div>
    );
};

export default Dashboard;
