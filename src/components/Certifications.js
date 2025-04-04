import React, { useEffect, useState } from 'react';
import AWS from '../aws-config';

const Certifications = ({ type }) => {
    const [certifications, setCertifications] = useState([]);

    useEffect(() => {

        const style = window.getComputedStyle(document.body);
        console.log('Mobile media query active:',
            window.matchMedia('(max-width: 768px)').matches);
        console.log('Certification item width:',
            style.getPropertyValue('width'));


        const fetchData = async () => {
            const dynamoDb = new AWS.DynamoDB.DocumentClient();

            const params = {
                TableName: 'Certifications',
                KeyConditionExpression: 'TypeOfCertification = :type',
                ExpressionAttributeValues: {
                    ':type': type,
                },
            };

            try {
                const data = await dynamoDb.query(params).promise();
                console.log('Data fetched:', data);
                if (data.Items) {
                    setCertifications(data.Items);
                } else {
                    console.error('No data found for the given key.');
                }
            } catch (error) {
                console.error('Error fetching certifications:', error);
            }
        };

        fetchData();
    }, [type]);


    const cloudPractitioner = certifications.find(
        (cert) => cert.NameOfCertification === 'AWS Certified Cloud Practitioner'
    );

    const otherCertifications = certifications.filter(
        (cert) => cert.NameOfCertification !== 'AWS Certified Cloud Practitioner'
    );

    return (
        <div className="certifications-container">
            <p className="cpath">Certifications / {type}</p>
            <h1>{type} Certifications</h1>
            {otherCertifications.length > 0 ? (
                otherCertifications.map((certification, index) => (
                    <div key={index} className="certification-item">
                        <h2>{certification.NameOfCertification}</h2>
                        <div className="certification-content">
                            {certification.CertificationPicture && (
                                <img
                                    src={certification.CertificationPicture}
                                    alt={certification.NameOfCertification}
                                    className="certification-image"
                                    onError={(e) => {
                                        console.error('Error loading image:', e.target.src);
                                        e.target.style.display = 'none';
                                    }}
                                />
                            )}
                            <div className="certification-details">
                                {certification.ExamDate && (
                                    <p><strong>Exam Date:</strong> {certification.ExamDate}</p>
                                )}
                                {certification.Reason && (
                                    <p><strong>Reason:</strong> {certification.Reason}</p>
                                )}
                                {certification.Validating && (
                                    <div>
                                        {certification.Validating.Dates && (
                                            <p><strong>Validity Period:</strong> {certification.Validating.Dates}</p>
                                        )}
                                        {certification.Validating.ValidateAt && (
                                            <p>
                                                <strong>Validate At:</strong>{" "}
                                                <a
                                                    href={certification.Validating.ValidateAt}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {certification.Validating.ValidateAt}
                                                </a>
                                            </p>
                                        )}
                                        {certification.Validating.Validation && (
                                            <p><strong>Validation:</strong> {certification.Validating.Validation}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No certifications found.</p>
            )}

            {cloudPractitioner && (
                <div className="certification-item">
                    <h2>{cloudPractitioner.NameOfCertification}</h2>
                    <div className="certification-content">
                        {cloudPractitioner.CertificationPicture && (
                            <img
                                src={cloudPractitioner.CertificationPicture}
                                alt={cloudPractitioner.NameOfCertification}
                                className="certification-image"
                                onError={(e) => {
                                    console.error('Error loading image:', e.target.src);
                                    e.target.style.display = 'none';
                                }}
                            />
                        )}
                        <div className="certification-details">
                            {cloudPractitioner.ExamDate && (
                                <p><strong>Exam Date:</strong> {cloudPractitioner.ExamDate}</p>
                            )}
                            {cloudPractitioner.Reason && (
                                <p><strong>Reason:</strong> {cloudPractitioner.Reason}</p>
                            )}
                            {cloudPractitioner.Validating && (
                                <div>
                                    {cloudPractitioner.Validating.Dates && (
                                        <p><strong>Validity Period:</strong> {cloudPractitioner.Validating.Dates}</p>
                                    )}
                                    {cloudPractitioner.Validating.ValidateAt && (
                                        <p>
                                            <strong>Validate At:</strong>{" "}
                                            <a
                                                href={cloudPractitioner.Validating.ValidateAt}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {cloudPractitioner.Validating.ValidateAt}
                                            </a>
                                        </p>
                                    )}
                                    {cloudPractitioner.Validating.Validation && (
                                        <p><strong>Validation:</strong> {cloudPractitioner.Validating.Validation}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Certifications;