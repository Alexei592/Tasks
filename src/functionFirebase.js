import {query,where,collection,getDocs,getFirestore,updateDoc,doc,getDoc} from "firebase/firestore";
import {auth} from "./firebase";
    const Add_AttractionYou=async (name_attr,set_all_attraction)=>
    {   
        const db=getFirestore();
        const userId=await getUsersByMail(auth.currentUser.email,db);
        const updateField = async (userId,value) => {
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);
            const currentAttraction = userDoc.data().Attraction;
            const updatedAttraction = [...currentAttraction, value];
            set_all_attraction(updatedAttraction);
            await updateDoc(userRef, {
              ['Attraction']: updatedAttraction,
            });
         }
         updateField(userId,name_attr);
}

const Remove_AttractionYou = async (name_attr, set_all_attraction) => {
    const db = getFirestore();
    const userId = await getUsersByMail(auth.currentUser.email, db);
    const updateField = async (userId, value) => {
      const userRef = doc(db, "users", userId);
      const userDoc = await getDoc(userRef);
      const currentAttraction = userDoc.data().Attraction;
      const updatedAttraction = currentAttraction.filter(attr => attr !== value);
      set_all_attraction(updatedAttraction);
      await updateDoc(userRef, {
        ['Attraction']: updatedAttraction,
      });
    }
    updateField(userId, name_attr);
  }

const All_Information_Attraction=async (UserId,set_all_attraction)=>
{
    const db=getFirestore();
    const UserRef=doc(db,"users",UserId);
    const userDoc=await getDoc(UserRef);
    set_all_attraction(userDoc.data().Attraction);
    console.log(userDoc.data().Attraction);
}

const getUsersByMail = async (email,db) => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let userIds;
    querySnapshot.forEach((doc) => {
        userIds=doc.id;
      });
      return userIds;
}

export {getUsersByMail,All_Information_Attraction,Add_AttractionYou,Remove_AttractionYou}