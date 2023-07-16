import { Injectable } from '@angular/core';
import { Category } from './category'; // './category' dosyasından Category modelini import ediyoruz
import { defaultcategories } from 'src/assets/defaultcategories'; // Ön tanımlı kategorileri içeren dosyayı import ediyoruz
import { PostService } from '../posts/post.service'; // '../posts/post.service' dosyasından PostService'i import ediyoruz

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = []; // Kategoriler dizisi

  constructor(private postService: PostService) { }

  getCategories(): Category[] {
    return this.categories; // Kategorileri döndürür
  }

  setCategories(): void {
    this.categories = defaultcategories; // Ön tanımlı kategorileri kategori dizisine atar
  }

  deleteCategory($event: number) {
    if (this.postService.getPosts().length === 0)
      this.postService.setPosts(); // PostService'ten gönderileri yükle
    if (this.postService.getPosts().filter(post => Number(post.categoryId) === Number($event)).length > 0)
      alert("You cannot delete a category with posts"); // Eğer kategoride gönderi varsa silme işlemi yapılamaz
    else
      this.categories = this.categories.filter(category => category.categoryId !== $event); // Kategoriyi sil
  }

  getCategoryById(id: number): Category | undefined {
    return this.categories.find((category) => category.categoryId === id); // Verilen kimliğe göre kategoriyi bulur ve döndürür
  }

  updateCategory(updateCategory: Category) {
    this.categories = this.categories.map(category => {
      if (category.categoryId === updateCategory.categoryId)
        category = updateCategory; // Güncellenen kategori bilgilerini atar
      return category;
    });
  }

  addCategory(newName: string, newDate: string) {
    const newCategory: Category = {
      categoryId: this.getCategories()[this.getCategories().length - 1].categoryId + 1, // Yeni kategori kimliğini son kategorinin kimliğine bir ekleyerek belirler
      name: newName,
      creationDate: newDate,
    }
    if (this.checkUniqueCategory(newCategory.name, newCategory.categoryId) === true)
      this.categories.push(newCategory); // Kategori benzersizse, yeni kategoriyi kategori dizisine ekler
    else
      alert("This category already exist"); // Kategori zaten varsa uyarı mesajı gösterir
  }

  findCategoryByName(name: string) {
    return this.categories.find((category) => category.name === name); // Verilen isme göre kategoriyi bulur ve döndürür
  }

  checkUniqueCategory(name: string, id: number): boolean {
    if (
      this.categories.find((category) => category.name === name.toLowerCase()) !== undefined &&
      this.findCategoryByName(name.toLowerCase())!.categoryId !== id
    )
      return false; // Kategori ismi başka bir kategoride kullanılıyorsa ve kategori kimliği farklıysa benzersiz değildir
    else
      return true; // Kategori benzersizdir
  }
}
