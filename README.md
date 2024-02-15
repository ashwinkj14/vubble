# Video Streaming Application

## Overview

This video streaming application offers a platform for users to watch video content hosted on AWS S3 and manage their profiles through a Firebase Real-time Database. Developed with React.js, it provides a seamless user experience with real-time updates for user profiles and instant access to a wide range of videos.

## Features

- **Video Streaming:** Stream video content directly from AWS S3.
- **User Profiles:** Real-time user profile management with Firebase Real-time Database.
- **Responsive Design:** Crafted with React.js for a responsive, seamless viewing experience on all devices.
- **User Authentication:** Secure login and registration process.
- **Interactive UI:** Engaging and easy-to-navigate user interface.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Firebase Real-time Database for user data management
- **Storage:** AWS S3 for video content storage
- **Authentication:** Firebase Authentication

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- NPM or Yarn
- AWS Account
- Firebase Account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/ashwinkj14/vubble.git
```

2. **Install dependencies**

Navigate to your project directory and install the required dependencies.

```bash
cd vubble
npm install
```

3. **Configure AWS S3**

- Set up an AWS S3 bucket and note your access key, secret key, and bucket name.
- Configure the AWS SDK with your credentials.

4. **Configure Firebase**

- Create a Firebase project and enable the Real-time Database and Authentication.
- Note your Firebase configuration and initialize Firebase in your application.

5. **Start the application**

```bash
npm start
```

Your application should now be running on `http://localhost:3000`.

## Usage

After logging in or registering, users can browse and watch video content streamed from AWS S3. Users can also manage their profiles through the Firebase Real-time Database.

## Contributing

Contributions are welcome! Please read our contributing guidelines for how to propose improvements or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the LICENSE file for details.

## Acknowledgments

- React.js Team
- AWS S3 Documentation
- Firebase Real-time Database Documentation
