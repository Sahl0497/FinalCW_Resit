new Vue({
  el: '#app',
  data: {
    lessons: lessons,
    cart: [],
    sortKey: '',
    sortOrder: 'asc',
    showCart: false,
    name: '',
    phone: '',
    searchQuery: ''
  },
  computed: {
    filteredLessons() {
      let filtered = this.lessons.filter(lesson => {
        const text = `${lesson.subject} ${lesson.location}`.toLowerCase();
        return text.includes(this.searchQuery.toLowerCase());
      });

      if (this.sortKey) {
        filtered.sort((a, b) => {
          let modifier = this.sortOrder === 'asc' ? 1 : -1;
          if (a[this.sortKey] > b[this.sortKey]) return 1 * modifier;
          if (a[this.sortKey] < b[this.sortKey]) return -1 * modifier;
          return 0;
        });
      }

      return filtered;
    }
  },
  methods: {
    addToCart(lesson) {
      if (lesson.availableSpaces > 0) {
        lesson.availableSpaces--;
        this.cart.push(lesson);
      }
    },
    removeFromCart(index) {
      const lesson = this.cart.splice(index, 1)[0];
      const found = this.lessons.find(l => l.id === lesson.id);
      if (found) found.availableSpaces++;
    },
    toggleCart() {
      this.showCart = !this.showCart;
    },
    sortLessons(key) {
      this.sortKey = key;
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    },
    isCheckoutValid() {
      return /^[a-zA-Z\s]+$/.test(this.name) && /^[0-9]+$/.test(this.phone);
    },
    checkout() {
      alert(`Thank you ${this.name}, your order has been submitted!`);
      this.cart = [];
      this.name = '';
      this.phone = '';
      this.showCart = false;
    }
  }
});