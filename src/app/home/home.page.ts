import { Component, inject } from '@angular/core';
import { AlertController, RefresherCustomEvent, ToastController } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // hier kommt eigener Code rein!
  // am besten mit etwas kleinem anfangen damit es einfach bleibt nichts kompliziertes!
  // variable exerciseList mit einem Array gefüllt mit Elementen
  exerciseList = JSON.parse(localStorage.getItem('Exercises')) || [];
  // AlertController definieren;
  constructor(private alertController: AlertController, private toastController: ToastController) {}

  // eigene Funktion schrreiben;

  async addExercise(){
    // 49:11 im video erklärt das
    const alert = await this.alertController.create({
      header: 'Neue Übung hinzufügen:',
      buttons: [{
        text: 'Speichern',
        handler: (values) => {
          this.exerciseList.push(values[0]);
          this.save();
        }
      }],
      inputs: [
        {
          placeholder: 'Neue Übung',
        },
        //  {
        //    type: 'number',
        //    placeholder: 'Gewicht',
        //    min: 1,
        //    max: 10000,
        //  },
      ]
    });

    await alert.present();
  }

  async presentToast(msg){
  const toast = await this.toastController.create({
    message: msg,
    duration: 1000,
    position: 'top'
  });

  await toast.present();
  }
  deleteItem(i){
    this.exerciseList.splice(i, 1);
    this.save();
    this.presentToast('Die Übung wurde gelöscht!');
  }

  save(){
    this.presentToast('Die Übung wurde hinzugefügt!')
    let itemsAsText = JSON.stringify(this.exerciseList);
    localStorage.setItem('Exercises', itemsAsText);
  }
  
}
