import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, GithubAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqhQ0Y0mi1yzqS5-fwyJBgVJGZtKTwtTY",
  authDomain: "skillswap-394717.firebaseapp.com",
  projectId: "skillswap-394717",
  storageBucket: "skillswap-394717.appspot.com",
  messagingSenderId: "54730669226",
  appId: "1:54730669226:web:1454ff23b009832a4324d3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

const provider = new GoogleAuthProvider()
const provider2 = new FacebookAuthProvider()
const provider3 = new GithubAuthProvider()

export const signInWithGoogle = ({ setGetLoginData}) => {
    signInWithPopup(auth, provider).then((result) => {
        setGetLoginData(result?.user)
        return result?.user
    }).catch(err => {
        console.log(err);
    })
}

export const signInWithFacebook = ({ setGetLoginData }) => {
    signInWithPopup(auth, provider2).then((result) => {
      setGetLoginData(result?.user)
      return result?.user
    }).catch(err => {
      console.log(err);
    })
  }

export const signInWithGithub = ({ setGetLoginData }) => {
    signInWithPopup(auth, provider3).then((result) => {
        console.log("resultfromauth", result);
        setGetLoginData(result?.user)
      return result?.user
    }).catch(err => {
      console.log(err);
    })
  }