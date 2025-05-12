import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import './Structure.css'; // Assuming it's in the same folder as Structure.jsx


const TreeNode = ({ node }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="tree-node" style={{ marginLeft: '20px', marginTop: '10px' }}>
            <div
                onClick={() => setExpanded(!expanded)}
                className="tree-toggle"
                style={{ cursor: 'pointer', fontWeight: 'bold' }}
            >
                {expanded ? '▼' : '▶'} {node.accountName} ({node.accountType})
            </div>

            {expanded && (
                <div className="tree-details" style={{ marginLeft: '20px' }}>
                    <p><strong>Code:</strong> {node.accountCode}</p>
                    <p><strong>Currency:</strong> {node.currency}</p>
                    <p><strong>Opening Balance:</strong> {node.opening_balance}</p>
                    <p><strong>Status:</strong> {node.status}</p>
                    <p><strong>Financial Year:</strong> {node.financial_year}</p>
                    <p><strong>Description:</strong> {node.description}</p>

                    {Array.isArray(node.sub_accounts) && node.sub_accounts.length > 0 && (
                        <div>
                            <h4>Sub Accounts:</h4>
                            {node.sub_accounts.map(sub => (
                                <TreeNode key={sub.account_id} node={sub} />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

const Structure = () => {
    const { state } = useLocation();
    const token = state?.token;
    const user = state?.user;
    console.log(token);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // loader state

    useEffect(() => {
        if (!token) return;

        setLoading(true);  // start loading

        axios.get('https://erbstaging.cyberin.io/api/v1/accounts/subaccounts', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setData(response.data?.result || []);
                setLoading(false);  // stop loading
            })
            .catch(error => {
                console.error('Error fetching structure:', error);
                setData([]);
                setLoading(false);  // stop loading
            });
    }, [token]);

    return (
        <div style={{ padding: '20px' }}>
        <Header username={`${user.first_name} ${user.last_name}`} token={token} />
        <div className="structure-container">
            <h2>Account Structure</h2>

            {loading ? (
                <p>Loading structure...</p>
            ) : (
                Array.isArray(data) && data.length > 0 ? (
                    data.map(account => (
                        <TreeNode key={account.account_id} node={account} />
                    ))
                ) : (
                    <p>No account data found.</p>
                )
            )}
        </div>
        </div>
    );
};

export default Structure;
