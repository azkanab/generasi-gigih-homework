# Spotifi

A replica of Spotify application

## About Spotifi

Spotifi is a music platform that is connected to the Spotify and use the Spotify API to integrate the data. It will be connected to your Spotify account, so it allows you to see all of your playlists on your Spotify account and even create a new one! You can also add some tracks to your playlist, and search the track that you want.

Spoitifi consists of 5 pages:
1. Login, where you first landed before you connect your Spotify account to the Spotifi, also the one that you will be landed on automatically once you are logged out or when your token is expired
2. Home, where you can see 50 trending songs and look out for songs based on a keyword
3. My Playlist, where you can see the playlist you have created on your Spotify account
4. Detail Playlist (after you click one of the playlist on My Playlist page), provides you the detail information of the chosen playlist
5. Create Playlist, which enables you to create a playlist to your Spotify account

You can have a full experience of this project [here](https://spotifi.vercel.app/).

### Built With

This project was built using [React.js](https://reactjs.org/) with React Router to make them as an SPA (Single Page Application), Redux and Recoil State for the state management, Jest for the test, a little bit of Typescript, and Vercel for the deployment. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

This section will explain more about how to run, test, and built this project in the development mode

### Run the app on local

1. Clone the repo
```
git clone https://github.com/azkanab/generasi-gigih-homework.git
```
2. Open the repo's folder on your terminal
3. Change the Spotify Key on .env file to your own Spotify Key
4. Change the Redirect URI on .env file to http://localhost:3000
5. Install NPM Packages
```
npm install
```
6. Run the app
```
npm start
```
7. Open [http://localhost:3000](http://localhost:3000) to view it your browser. The page will reload if you make edits

### Testing

Launches the test runner in the interactive watch mode by running this command on your terminal:
```
npm test
```
and you will find this

<img src="/shots/unit_test.png" width="450px">

## Preview

Here are some screenshot of this project once it is built or deployed in desktop mode or mobile mode

1. Login, once you click the login button, you will be redirected to the Spotify login page in order to authorize the application to access your account information such as profile and playlist.
P.S. : If you try it on [https://spotifi.vercel.app/](https://spotifi.vercel.app/), your e-mail account should be registered on my development dashboard first, so please notify me if you want to try this app. If you try it on the local, please use your own Spotify Key.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/login_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/login_mobile.jpg"> 
    </td>
  </tr>
</table>

2. After you are logged in, you will be redirected to the homepage. As you can see on the screenshot below, there are 50 trending songs that are provided and there is a navigation bar at the top and sidebar on the left. We can go to our profile by clicking the profile section at the top right.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/home_1_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/home_1_mobile.jpg"> 
    </td>
  </tr>
</table>

We can search for other songs based on the keyword in the input we have filled in. This only limited to 50 related songs.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/home_2_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/home_2_mobile.jpg"> 
    </td>
  </tr>
</table>

3. Navigate yourself using the sidebar on the left. You can make use of the burger menu at the left side of the navigation bar to open the sidebar. Each menu will lead you to each feature, except for the logout, it will redirect you to the login page and you won't be able to go to the homepage anymore unless you create a new token by redoing the login.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/sidebar_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/sidebar_mobile.jpg"> 
    </td>
  </tr>
</table>

4. After we click the 'My Playlist' menu on the sidebar, we will be redirected to a new page, which provides you a list of the playlists that you have.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/my-playlist_1_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/my-playlist_1_mobile.jpg">
    </td>
  </tr>
</table>

5. To go to the detail of each playlist, click on the card that you want and you will see this screen. The screen provides you the information of the playlist such as name, title, and the songs that are in the playlist.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/playlist-detail_1_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/playlist-detail_1_mobile.jpg"> 
    </td>
  </tr>
</table>

6. Now we're heading to the 'Create Playlist' page! Now we will try to make a new playlist to your Spotify connected (yes it is connected!????).

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/create-playlist_1_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/create-playlist_1_mobile.jpg">
    </td>
  </tr>
</table>

Oops, you need to make the name to be 10 characters long????

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/create-playlist_2_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/create-playlist_2_mobile.jpg"> 
    </td>
  </tr>
</table>

So should the description, it should be 20 characters long.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/create-playlist_3_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/create-playlist_3_mobile.jpg">
    </td>
  </tr>
</table>

 Look at the 'Create' button, it has changed to the green color which means 'You're good to go!'. Now you can click on the button as all of the data have been validated.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/create-playlist_4_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/create-playlist_4_mobile.jpg">
    </td>
  </tr>
</table>

Yeay you've made it!!

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/create-playlist_5_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/create-playlist_5_mobile.jpg"> 
    </td>
  </tr>
</table>

7. Then you will be redirected to the 'My Playlist' page to show you that your playlist have been successfully made.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/my-playlist_2_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/my-playlist_2_mobile.jpg">
    </td>
  </tr>
</table>

You also can go to the detail page to see the description of your playlist and look, there is still no track in the playlist. Now, it's time for us to add a new track to the playlist.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/playlist-detail_2_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/playlist-detail_2_mobile.jpg"> 
    </td>
  </tr>
</table>

8. How do we do that? Go to the homepage first, hover on the track card that you want to add (for desktop) or click on that track card (for mobile) until you see a play button.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/home_3_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/home_3_mobile.jpg">
    </td>
  </tr>
</table>

Then, click on the play button and you will see a modal pop out on the screen.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/home_4_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/home_4_mobile.jpg"> 
    </td>
  </tr>
</table>

Select the playlist that you want the track to be added into and click on the 'Add' button.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/home_5_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/home_5_mobile.jpg">
    </td>
  </tr>
</table>

When you see this modal, it means that the track has been successfully added to the playlist that you just chose.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/home_7_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/home_7_mobile.jpg"> 
    </td>
  </tr>
</table>

9. Go to the 'My Playlist' check to see if you have added the track.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/my-playlist_3_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/my-playlist_3_mobile.jpg">
    </td>
  </tr>
</table>

10. When you check the detail of the playlist, you can also see that the track has been added.

<table>
  <tr>
    <td valign="top">
        <img src="/shots/desktop/playlist-detail_3_desktop.png">
    </td>
    <td valign="top">
        <img src="/shots/mobile/playlist-detail_3_mobile.jpg"> 
    </td>
  </tr>
</table>

11. Now that you have finished all of the tutorials, you may logout by clicking the 'Logout' menu on the sidebar.
