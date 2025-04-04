import React, { useEffect, useState } from 'react';
import AWS from '../aws-config';
import { Link } from 'react-router-dom';

const Internship2022 = ({ section }) => {
    const [internship, setInternship] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const dynamoDb = new AWS.DynamoDB.DocumentClient();

            const params = {
                TableName: 'Internships',
                Key: {
                    InternshipCompany: 'Amazon Web Services, Inc.',
                    InternshipName: 'AWS Summer 2022 Internship',
                },
            };

            console.log('Fetching data with params:', params);

            try {
                const data = await dynamoDb.get(params).promise();
                console.log('Data fetched:', data);
                setInternship(data.Item);
            } catch (error) {
                console.error('Error fetching internship:', error);
            }
        };

        fetchData();
    }, [section]);

    const formatSectionName = (section) => {
        const sectionNames = {
            'role': 'Role Overview',
            'accomplishments': 'Accomplishments',
            'project': 'Project'
        };
        return sectionNames[section] || section;
    };
    const renderHTML = (html) => {
        return { __html: html };
    };

    return (
        <div className="internship-container">
            <p className="ipath">{internship?.InternshipName} / {formatSectionName(section)}</p>
            <h1>Amazon Summer 2022 Internship</h1>
            {internship ? (
                <div>
                    {internship.Subheading && (
                        <h2 className="subheading">
                            {internship.Subheading.Title} — {internship.Subheading.Location} from {internship.Subheading.Dates}
                        </h2>
                    )}
                    {section === 'role' && (
                        <div className="role-overview">
                            <h2>Role Overview</h2>
                            {internship.RoleAndResponsibilities?.RoleOverview ? (
                                <p>{internship.RoleAndResponsibilities.RoleOverview}</p>
                            ) : (
                                <p>No role overview data found.</p>
                            )}
                            <h2>Responsibilities</h2>
                            <div className="responsibilities-container">
                                {internship.IntPicture && (
                                    <img
                                        src={internship.IntPicture}
                                        alt="Internship"
                                        className="internship-image"
                                    />
                                )}
                                {internship.RoleAndResponsibilities?.Responsibilities ? (
                                    <p
                                        dangerouslySetInnerHTML={renderHTML(internship.RoleAndResponsibilities.Responsibilities)}
                                    />
                                ) : (
                                    <p>No responsibilities data found.</p>
                                )}
                            </div>
                        </div>
                    )}
                    {section === 'accomplishments' && (
                        <div className="accomplishments">
                            <h2>Accomplishments</h2>
                            <p dangerouslySetInnerHTML={renderHTML(internship.Accomplishments)} />
                            {internship.AccPicture && (
                                <img
                                    src={internship.AccPicture}
                                    alt="Accomplishments"
                                    className="accomplishments-image"
                                />
                            )}
                        </div>
                    )}
                    {section === 'project' && (
                        <div className="project">
                            <h2>Project</h2>
                            <p>{internship.Project}</p>
                            <h2 className="button-directions">Click below to explore more!</h2>
                            <div className="button-container">
                                <Link to="/projects/sa-hiring" className="oval-button">Solutions Architect Hiring Factory Automation Project</Link>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <p>No internship data found.</p>
            )}
        </div>
    );
};

export default Internship2022;