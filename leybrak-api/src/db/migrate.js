const pool = require('./pool');

const createTables = async () => {
  const query = `
    -- Extensión para UUIDs
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- Tabla principal de leads (solicitudes del formulario y WhatsApp)
    CREATE TABLE IF NOT EXISTS leads (
      id            UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
      nombre        VARCHAR(120) NOT NULL,
      telefono      VARCHAR(20)  NOT NULL,
      servicio      VARCHAR(80),        -- 'saas', 'custom', 'data_vision', 'general'
      origen        VARCHAR(30)  NOT NULL DEFAULT 'formulario', -- 'formulario' | 'whatsapp'
      mensaje       TEXT,               -- campo libre opcional
      estado        VARCHAR(20)  NOT NULL DEFAULT 'nuevo',  -- 'nuevo' | 'contactado' | 'cerrado'
      ip_origen     VARCHAR(45),        -- para detección de spam
      created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
      updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
    );

    -- Índices útiles para filtrar y ordenar en el panel admin
    CREATE INDEX IF NOT EXISTS idx_leads_estado     ON leads(estado);
    CREATE INDEX IF NOT EXISTS idx_leads_servicio   ON leads(servicio);
    CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

    -- Trigger para actualizar updated_at automáticamente
    CREATE OR REPLACE FUNCTION update_updated_at()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    DROP TRIGGER IF EXISTS leads_updated_at ON leads;
    CREATE TRIGGER leads_updated_at
      BEFORE UPDATE ON leads
      FOR EACH ROW EXECUTE FUNCTION update_updated_at();
  `;

  try {
    await pool.query(query);
    console.log('✅ Tablas creadas correctamente');
  } catch (err) {
    console.error('❌ Error creando tablas:', err.message);
  } finally {
    await pool.end();
  }
};

createTables();
