import { ApplicationConfig, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';


import locale from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';

import { initializeApp } from '@angular/fire/app';
import { provideFirebaseApp } from '@angular/fire/app';

import { getAuth } from "@angular/fire/auth"
import { provideAuth } from "@angular/fire/auth"

import { getFirestore } from "firebase/firestore"
import { provideFirestore } from "@angular/fire/firestore"

import { getStorage } from "firebase/storage"
import { provideStorage } from "@angular/fire/storage"

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { firebaseConfig } from './firebase.config';
import { BrowserModule } from '@angular/platform-browser';

registerLocaleData(locale, 'es-CO')


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(reducers, { metaReducers }), importProvidersFrom(
    [
      provideFirebaseApp(() => initializeApp(firebaseConfig)), 
      provideAuth(() => getAuth()),
      provideFirestore(() => getFirestore()),
      provideStorage(() => getStorage())
    ]
  ),
 importProvidersFrom([ BrowserModule]),
 importProvidersFrom([ BrowserAnimationsModule])
]
};
