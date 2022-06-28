import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {Post} from "../models/post.model";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  // variable contenant le formulaire de type FormGroup
  postForm!: FormGroup;
  // variable d'observable = emmission de type Post
  postPreview$!: Observable<Post>;
  // variable pattern pour validator de l'email de type RegExp
  urlRegex!: RegExp;

  // injection de l'outil FormBuilder = création de formulaire réactif
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit(): void {

    // initialisation de urlRegex
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    // définition des champs du formulaire
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      description: [null, Validators.required],
      location: [null]
    },
    {
      // formulaire mis à jour que lorsque l'on change de champs
      updateOn: 'blur'
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
