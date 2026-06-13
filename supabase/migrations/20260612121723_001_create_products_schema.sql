-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  code TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  photos TEXT[] DEFAULT '{}',
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  featured BOOLEAN DEFAULT FALSE,
  bestseller BOOLEAN DEFAULT FALSE,
  offer_of_the_day BOOLEAN DEFAULT FALSE,
  link TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin users table for authentication
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug) VALUES 
  ('Saúde e Beleza', 'saude-e-beleza'),
  ('Casa e Utensílios', 'casa-e-utensilios'),
  ('Moda e Estilo', 'moda-e-estilo');

-- Insert sample products
INSERT INTO products (code, title, description, price, photos, category_id, featured, bestseller, offer_of_the_day, link) VALUES
-- Saúde e Beleza
('SB001', 'Kit Skincare Premium', 'Conjunto completo para cuidados com a pele com ingredientes naturais', 149.90, ARRAY['https://images.pexels.com/photos/3781553/pexels-photo-3781553.jpeg'], 1, true, true, false, null),
('SB002', 'Perfume Importado', 'Fragrância exclusiva com notas florais e amadeiradas', 299.90, ARRAY['https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg'], 1, false, true, true, null),
('SB003', 'Kit Maquiagem Profissional', 'Paleta de sombras, batons e pincéis premium', 189.90, ARRAY['https://images.pexels.com/photos/258632/pexels-photo-258632.jpeg'], 1, true, false, false, null),
('SB004', 'Óleo Capilar Restaurador', 'Tratamento intensivo para cabelos danificados', 79.90, ARRAY['https://images.pexels.com/photos/3990401/pexels-photo-3990401.jpeg'], 1, false, false, false, null),
-- Casa e Utensílios
('CU001', 'Jogo de Panelas Antiaderentes', 'Conjunto com 5 peças para cozinha profissional', 349.90, ARRAY['https://images.pexels.com/photos/4228691/pexels-photo-4228691.jpeg'], 2, true, true, false, null),
('CU002', 'Conjunto de Toalhas Premium', 'Toalhas de banho macias e absorventes', 89.90, ARRAY['https://images.pexels.com/photos/4226904/pexels-photo-4226904.jpeg'], 2, false, true, true, null),
('CU003', 'Organizador Modular', 'Sistema de organização para armários e gavetas', 59.90, ARRAY['https://images.pexels.com/photos/4226886/pexels-photo-4226886.jpeg'], 2, true, false, false, null),
('CU004', 'Luminária Decorativa LED', 'Iluminação moderna com 3 temperaturas de cor', 129.90, ARRAY['https://images.pexels.com/photos/4226945/pexels-photo-4226945.jpeg'], 2, false, false, false, null),
-- Moda e Estilo
('ME001', 'Bolsa de Couro Legítimo', 'Design elegante com alças ajustáveis', 459.90, ARRAY['https://images.pexels.com/photos/1159670/pexels-photo-1159670.jpeg'], 3, true, true, false, null),
('ME002', 'Relógio Analógico Premium', 'Movimento automático com pulseira de couro', 599.90, ARRAY['https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg'], 3, false, true, true, null),
('ME003', 'Óculos de Sol Designer', 'Proteção UV400 com armação acetato', 279.90, ARRAY['https://images.pexels.com/photos/46252/glasses-vintage-vase-old-46252.jpeg'], 3, true, false, false, null),
('ME004', 'Carteira Masculina Premium', 'Couro legítimo com múltiplos compartimentos', 189.90, ARRAY['https://images.pexels.com/photos/207081/pexels-photo-207081.jpeg'], 3, false, false, false, null);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash) VALUES ('admin@gosteimuito.com', 'admin123');

-- Enable RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "categories_read" ON categories FOR SELECT TO anon, authenticated USING (true);

-- RLS Policies for products (public read, admin write)
CREATE POLICY "products_read" ON products FOR SELECT TO anon, authenticated USING (true);

-- RLS Policies for admin_users
CREATE POLICY "admin_users_read" ON admin_users FOR SELECT TO authenticated USING (true);