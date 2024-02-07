const citiesRef = collection(db, "cities");



async function setDb() {
  await setDoc(doc(citiesRef, "SF"), {
      name: "San Francisco", state: "CA", country: "USA",
      capital: false, population: 860000,
      regions: ["west_coast", "norcal"] });
  await setDoc(doc(citiesRef, "LA"), {
      name: "Los Angeles", state: "CA", country: "USA",
      capital: false, population: 3900000,
      regions: ["west_coast", "socal"] });
  await setDoc(doc(citiesRef, "DC"), {
      name: "Washington, D.C.", state: null, country: "USA",
      capital: true, population: 680000,
      regions: ["east_coast"] });
  await setDoc(doc(citiesRef, "TOK"), {
      name: "Tokyo", state: null, country: "Japan",
      capital: true, population: 9000000,
      regions: ["kanto", "honshu"] });
  await setDoc(doc(citiesRef, "BJ"), {
      name: "Beijing", state: null, country: "China",
      capital: true, population: 21500000,
      regions: ["jingjinji", "hebei"] });
}

setDb();

async function getData() {
  const docRef = doc(db, "cities", "SF");
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}


getData();

const usersRef = collection(db, "users");
const user = {
  user_id: 'qwe123',
  user_mail: 'qwe123@gmail.com',
  watched: [{film_id: '123', film_title: 'title1'}, {film_id: '321', film_title: 'title2'}],
  queued: [{film_id: '456', film_title: 'title3'}, {film_id: '654', film_title: 'title4'}]
}

async function writeData() {
  await setDoc(doc(usersRef, `${user.user_id}`), user)
}

writeData();

async function getData() {
  // const docRef = doc(db, "users", `${user.user_id}`);
  const docSnap = await getDoc(doc(db, "users", `${user.user_id}`));
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

getData();


const washingtonRef = doc(db, "cities", "DC");

// Atomically add a new region to the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayUnion("greater_virginia")
});

// Atomically remove a region from the "regions" array field.
await updateDoc(washingtonRef, {
    regions: arrayRemove("east_coast")
});