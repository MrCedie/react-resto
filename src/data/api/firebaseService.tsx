import {
  get,
  getDatabase,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import firebase from "../../firebaseConfig";

export const fetchDataFirebase = async (): Promise<any> => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "inventory");
  const snapshot = await get(dbRef);
  return snapshot.val();
};

export const getItemDataFirebase = async (id: string): Promise<any> => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "inventory/" + id);

  const snapshot = await get(dbRef);
  return snapshot.val();
};

export const addFirebase = async (formData: any) => {
  const db = getDatabase(firebase);
  const dbDocRef = push(ref(db, "inventory"), formData);
  return set(dbDocRef, formData);
};

export const removeFirebase = async (id: string) => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "inventory/" + id);
  await remove(dbRef);
  return true;
};

export const updateFirebase = async (id: string, formData: any) => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "inventory/" + id);
  await update(dbRef, {
    ...formData,
  });
  return true;
};
