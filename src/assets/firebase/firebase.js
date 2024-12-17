import { initializeApp } from 'firebase/app';
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	where,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyAun49wa26gc7dE4ziBVkt3hpzRXd--Xlc',

	authDomain: 'compradetodo-f698e.firebaseapp.com',

	projectId: 'compradetodo-f698e',

	storageBucket: 'compradetodo-f698e.firebasestorage.app',

	messagingSenderId: '917480659498',

	appId: '1:917480659498:web:44fe8421813052bffcc153',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function getOneProduct(id) {
	const documentRef = doc(db, 'productos', id);

	try {
		const snapshot = await getDoc(documentRef);
		if (snapshot.exists()) {
			return { id: snapshot.id, ...snapshot.data() };
		} else {
			console.log('Documento no existe');
			return null;
		}
	} catch (error) {
		console.error('Error al obtener documento', error);
		throw error;
	}
}

export async function getAllProducts() {
	try {
		const querySnapshot = await getDocs(collection(db, 'productos'));
		if (querySnapshot.size !== 0) {
			const productsList = querySnapshot.docs.map((docmnt) => {
				return {
					id: docmnt.id,
					...docmnt.data(),
				};
			});
			return productsList;
		} else {
			console.log('Sin Elementos en la Coleccion');
			return [];
		}
	} catch (error) {
		console.error('Error al obtener la Coleccion', error);
		throw error;
	}
}

export const getProductsByCategory = async (category) => {
	try {
		const productsRef = collection(db, 'productos');
		const q = query(productsRef, where('category', '==', category));
		const snapshot = await getDocs(q);
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error('Error al Obtener el Filtrado', error);
	}
};

export async function sendBuyOrder(orders) {
	const ordersCollection = collection(db, 'orders');
	try {
		const docRef = await addDoc(ordersCollection, orders);
		return docRef.id;
	} catch (error) {
		console.error('Error al agregar el Nuevo Documento', error);
	}
}
