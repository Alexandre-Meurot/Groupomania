import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  // variable contenant le formulaire
  postForm!: FormGroup;

  // injection de l'outil FormBuilder = création de formulaire réactif
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.postForm = this.formBuilder.group({
      title: [null],
      imageUrl: [null],
      description: [null],
      location: [null]
    })

  }

  // méthode d'envoie du formulaire - prévoir envoie au serveur
  onSubmitForm(): void {
    console.log(this.postForm.value);
  }

}
