import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';


@Component({
	selector: 'app-create-blog',
	templateUrl: './create-blog.component.html',
	styleUrls: [ './create-blog.component.scss' ]
})
export class CreateBlogComponent implements OnInit {
	
	blogForm:FormGroup

	constructor(private formBuilder: FormBuilder, private router: Router, private BlogService: BlogService) {}

	ngOnInit(): void {
		this.blogForm = this.formBuilder.group({
			name: ['', Validators.required],
			userId:[window.localStorage.getItem('id'), Validators.required], //from user service!!	
			blogImage: [],
			tags: [],
			description: [, Validators.required],
		});
	}

	get data() { return this.blogForm.controls; }


	onSubmit() {    
		if (this.blogForm.invalid) {
		  return;
		} else {
			const params = {
				name: this.data.name.value,
				userId:this.data.userId.value, 
				blogImage: this.data.blogImage.value,
				tags: this.data.tags.value,
				description: this.data.description.value
			};
			
			this.BlogService.create(params).subscribe(
				(response: any[]) => {
					console.log(response);
					this.router.navigate(['/']);
				},
				(error) => {
						
				}
			  );
		
		
		}
	  }
}
