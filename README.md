IP Address Tracker

This project is an IP Address Tracker built with React, Leaflet, and Tailwind CSS. It leverages the IP Geolocation API to provide detailed information about a given IP address or domain, including the location, timezone, and ISP. The project features a responsive design with a beautiful background image and an interactive map to display the geolocation data.
Features

    IP Address and Domain Search: Allows users to search for any IP address or domain to get geolocation data.
    Geolocation Information: Displays detailed information such as IP address, location (city and region), timezone, and ISP.
    Interactive Map: Uses Leaflet to display an interactive map showing the location of the entered IP address or domain.
    Responsive Design: Built with Tailwind CSS to ensure a responsive and visually appealing design across all devices.

Technologies Used

    React: For building the user interface and handling state management.
    Leaflet: For rendering the interactive map.
    Tailwind CSS: For styling the application with a responsive design.
    IP Geolocation API: To fetch geolocation data based on IP address or domain.
    Netlify: For deployment and environment variable management.

    Setup and Installation

1.  Clone the repository:
    git clone https://github.com/yourusername/ip-address-tracker.git
    cd ip-address-tracker

Install the dependencies:

sh

npm install

Add your API key:

Create a .env file in the root directory and add your IP Geolocation API key:

sh

REACT_APP_API_KEY=your_api_key_here

Start the development server:

sh

npm start

Build for production:

sh

    npm run build

Usage

    Enter an IP address or domain into the search bar.
    Click the search button to fetch and display the geolocation information.
    View the location on the interactive map.

Deployment

This project is easily deployable on Netlify. You can add your environment variables in the Netlify UI or using the Netlify CLI as described below.
Adding Environment Variables in Netlify

    Log in to your Netlify account.
    Navigate to your site dashboard.
    Go to Site settings > Build & deploy > Environment.
    Click Edit Variables or Add a variable.
    Add your environment variable REACT_APP_API_KEY with your API key value.
    Save the changes.

Screenshots

License

This project is licensed under the MIT License. See the LICENSE file for details.
Acknowledgments

    IP Geolocation API for providing the geolocation data.
    Frontend Mentor for the project inspiration.
    Leaflet for the interactive map component.
