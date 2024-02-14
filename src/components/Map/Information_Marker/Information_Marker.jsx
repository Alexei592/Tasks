import s from './Information_Marker.module.css'
import {auth} from "../../../firebase.js";
import {query,where,collection,getDocs,getFirestore,updateDoc,doc,getDoc} from "firebase/firestore";
function Information_Marker({name_attr})
{

    const Add_AttractionYou=async (name_attr)=>
    {   

        const db=getFirestore();
        const getUsersByMail = async (email) => {
            const usersCollection = collection(db, "users");
            const q = query(usersCollection, where("email", "==", email));
            const querySnapshot = await getDocs(q);
            let userIds;
            querySnapshot.forEach((doc) => {
                userIds=doc.id;
              });
              return userIds;
        }
        const userId=await getUsersByMail(auth.currentUser.email);
        console.log(userId);
        const updateField = async (userId,value) => {
            const userRef = doc(db, "users", userId);
            const userDoc = await getDoc(userRef);
            const currentAttraction = userDoc.data().Attraction;
            const updatedAttraction = [...currentAttraction, value];
            await updateDoc(userRef, {
              ['Attraction']: updatedAttraction,
            });
         }
         updateField(userId,name_attr);
}

    return <div className={`col-4 ${s.container}`}>
        <img className='col-11' src="attraction.jpg" alt="photo_attraction" />
        <h2>{name_attr}</h2>
        <div className={s.izb}>
            <span onClick={()=>Add_AttractionYou(name_attr)}>Добавить в избранное</span>
            <img className='col-1' src="starr.png" alt="" />
        </div>
    </div>
}

export {Information_Marker}