import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Post} from "../models/post.model";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  // variable contenant le formulaire
  postForm!: FormGroup;

  // variable d'observable = emmission de type Post
  postPreview$!: Observable<Post>;

  // injection de l'outil FormBuilder = création de formulaire réactif
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    this.postForm = this.formBuilder.group({
      title: [null],
      imageUrl: [null],
      description: [null],
      location: [null]
    });

    // observable qui emmet tous les changement du formulaire postForm
    // + modification de l'observable pour y ajouter les autres attributs d'un Post
    this.postPreview$ = this.postForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        createdDate: new Date(),
        id: 0,
        likes: 0
      }))
    );

  }

  // méthode d'envoie du formulaire - prévoir envoie au serveur
  onSubmitForm(): void {
    console.log(this.postForm.value);
  }

}
