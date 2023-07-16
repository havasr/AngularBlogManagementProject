import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { Category } from '../category'; // '../category' dosyasından Category modelini import ediyoruz
import { CategoryService } from '../category.service'; // '../category.service' dosyasından CategoryService'i import ediyoruz
import { PostService } from 'src/app/posts/post.service'; // 'src/app/posts/post.service' dosyasından PostService'i import ediyoruz
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/posts/post';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  category: Category = {
    categoryId: 0,
    name: "",
    creationDate: "",
  };
  updatedCategory: Category = {
    categoryId: this.category.categoryId,
    name: "",
    creationDate: "",
  };
  postCount: number = 0;
  editMode: boolean = false;
  posts: Post[] = [];

  dataSource = new MatTableDataSource<Post>(); // MatTableDataSource kullanarak veri kaynağı oluşturuyoruz
  displayedColumns: string[] = ['postId', 'title', 'viewCount', 'creationDate', 'isPublished']; // Tabloda görüntülenecek sütunlar
  totalItems: any; // Toplam öğe sayısı

  constructor(
    private categoryService: CategoryService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id']; // Yönlendirme parametresinden kategori kimliğini al
      this.category = this.categoryService.getCategoryById(Number(id))!; // Kategori kimliğine göre ilgili kategoriyi bul ve atama yap
      if (this.category == undefined) {
        // Eğer kategori bulunamazsa veya tanımsızsa
        if (this.categoryService.getCategories().length === 0) {
          this.categoryService.setCategories(); // CategoryService'ten kategorileri yükle
          this.category = this.categoryService.getCategoryById(Number(id))!; // Kategori kimliğine göre ilgili kategoriyi bul ve atama yap
        }
        // alert("An error occurred while retrieving category information.");
        // this.router.navigateByUrl("/categorylist");
      }
      this.updatedCategory.categoryId = Number(id); // Düzenleme için güncellenen kategorinin kimliğini ayarla
      if (this.postService.getPosts().length === 0)
        this.postService.setPosts(); // PostService'ten gönderileri yükle

      this.posts = this.postService.getPosts().filter(post => post.categoryId === Number(id));
      this.dataSource = new MatTableDataSource(this.posts);
      this.postCount = this.postService.getPosts().filter(post => post.categoryId === Number(id)).length; // Kategoriye ait gönderi sayısını hesapla
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator; // MatPaginator'ı kullanarak veri sayfalandırmasını yapılandırıyoruz
  }

  handleEditClick() {
    this.editMode = !this.editMode; // Düzenleme modunu tersine çevir
  }

  handleSaveClick() {
    this.categoryService.updateCategory(this.category); // CategoryService üzerinden kategori güncellemesini yap
    this.router.navigateByUrl("/categorylist"); // 'categorylist' yoluna yönlendir
  }

  handleCancelClick() {
    this.editMode = false; // Düzenleme modunu kapat
    this.updatedCategory.creationDate = ""; // Güncellenen kategori oluşturma tarihini sıfırla
    this.updatedCategory.name = ""; // Güncellenen kategori adını sıfırla
  }

  handleDeleteClick() {
    this.categoryService.deleteCategory(this.category.categoryId); // CategoryService üzerinden kategori silme işlemini yap
    this.router.navigateByUrl('/categorylist'); // 'categorylist' yoluna yönlendir
  }

  gotoCategoriePosts(categoryId: any) {
    this.router.navigate(['/postlist'], {
      queryParams: { categoryId: categoryId }
    });

  }
}
