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
import { v4 as uuidv4 } from "uuid";

export const getProductsFirebase = async (): Promise<any> => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "product");
  const snapshot = await get(dbRef);
  return snapshot.val();
};

export const getCategoryFirebase = async (): Promise<any> => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "category");
  const snapshot = await get(dbRef);
  return snapshot.val();
};

export const getProductFirebase = async (id: string): Promise<any> => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "product/" + id);
  const snapshot = await get(dbRef);
  return snapshot.val();
};

export const addFirebase = async (formData: any) => {
  const db = getDatabase(firebase);
  const uuid = uuidv4();
  const dbDocRef = ref(db, "product/" + uuid);
  push(dbDocRef, formData);
  return set(dbDocRef, formData);
};

export const removeFirebase = async (id: string) => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "product/" + id);
  return await remove(dbRef);
};

export const updateFirebase = async (id: string, formData: any) => {
  const db = getDatabase(firebase);
  const dbRef = ref(db, "product/" + id);
  return await update(dbRef, {
    ...formData,
  });
};
