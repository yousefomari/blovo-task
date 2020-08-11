import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { CommentService } from '../../services/comment.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss'],
})
export class ViewBlogComponent implements OnInit {
  id: number;
  blog: any;
  comments: any;
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      comment: [, Validators.required],
    });

    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.getBlog();
    });
  }

  getBlog() {
    console.log(this.id);
    this.blogService.getBlog(this.id).subscribe(
      (response: any[]) => {
        this.blog = response;
        this.getComments();
      },
      (error) => {}
    );
  }
  getComments() {
    this.commentService.get(this.id).subscribe(
      (response: any[]) => {
        this.comments = response;
      },
      (error) => {}
    );
  }

  deleteComment(id: number) {
    const msg = confirm('are you sure?');
    msg &&
      this.commentService.delete(id).subscribe(
        (response: any[]) => {
          this.getComments();
        },
        (error) => {}
      );
  }

  postComment() {
    const comment = this.commentForm.controls.comment.value;
    const data = {
      comment,
      blogId: this.blog.id,
    };
    this.commentService.create(data).subscribe((i) => {
      this.commentForm.controls.comment.setValue('');
      this.getComments();
    });
  }
}
