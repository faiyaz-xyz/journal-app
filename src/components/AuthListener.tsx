import { app } from "../../firebaseConfig"
import { auth } from "../../firebaseConfig"
import { onAuthStateChanged, User } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loggedUser } from "@/store/slice"

export default function AuthListener() {
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        dispatch(loggedUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        }))
      } else {
        dispatch(loggedUser(null))
      }
    })

    return () => unsubscribe()
  }, [auth, dispatch])

  return null
}
