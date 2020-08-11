import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateBlogComponent } from './blogs/create-blog/create-blog.component';
import { ViewBlogComponent } from './blogs/view-blog/view-blog.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'createBlog', component: CreateBlogComponent },
	{ path: 'viewBlog/:id', component: ViewBlogComponent },
	{ path: 'users', component: UsersListComponent },
	{ path: '**', component: PageNotFoundComponent } // Wildcard route for a 404 page];
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
