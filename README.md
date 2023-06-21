# ezDeploy

This project serves as a showcase for my React and Flask skills. The app provides a seamless and efficient deployment process for user-built static websites by utilizing AWS S3 buckets.

Key Features:

    Streamlined Deployment: Users can easily upload their static websites to an AWS S3 bucket, enabling quick and hassle-free deployment.
    Security Measures: The app implements multiple layers of security and file checks to prevent the uploading of invalid or oversized files.
    User System: Comprehensive user system that enables account creation using email addresses and encrypted passwords. Email needs to be verified before the first connection.
    Contact Form: The app includes a fully functional contact form, allowing users to easily get in touch with me for any inquiries or feedback they may have.
    Scalability with Celery: By utilizing Celery, a distributed task queue system, the app efficiently handles multiple asynchronous tasks simultaneously. This scalability ensures      smooth performance even during high usage periods.
    MySQL Database: User's data are stored in a MySQL Database powered by the sqlAlchemy ORM.
    Real-Time Notifications: To keep users informed about the uploading process, the server sends real-time notifications using Server-Sent Events (SSE). This feature allows users to stay updated on the progress of their uploads.
    Enhanced Authentication: JWT (JSON Web Tokens) are used for authentication, providing a secure and efficient method for user verification. I have implemented double submit verification to further enhance the security of the authentication process.
    Responsive: Even though the app isn't meant to be used on mobile devices, you can still access all of its features on your phone through its responsive design.
