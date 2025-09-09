#!/usr/bin/env node

/**
 * Supabase Connection Verification Script
 * 
 * This script verifies that the Supabase connection is working correctly
 * for the NeurAnt Landing Page project.
 * 
 * Usage: node scripts/verify-supabase.js
 */

const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function verifySupabaseConnection() {
  log('\n🔍 Verificando conexión a Supabase Cloud...', 'cyan');
  log('=' .repeat(50), 'blue');

  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    log('❌ Error: Variables de entorno faltantes', 'red');
    log('   Asegúrate de tener configurado .env.local con:', 'yellow');
    log('   - NEXT_PUBLIC_SUPABASE_URL', 'yellow');
    log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY', 'yellow');
    return false;
  }

  log(`✅ URL de Supabase: ${supabaseUrl}`, 'green');
  log(`✅ Anon Key configurada: ${supabaseAnonKey.substring(0, 20)}...`, 'green');

  try {
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    log('\n📡 Probando conexión...', 'cyan');

    // Test basic connection
    const { data, error } = await supabase
      .from('waitlist_registrations')
      .select('count', { count: 'exact', head: true });

    if (error) {
      if (error.message.includes('relation "waitlist_registrations" does not exist')) {
        log('⚠️  Tabla waitlist_registrations no existe aún', 'yellow');
        log('   Ejecuta: npx supabase db push para aplicar migraciones', 'yellow');
        return 'table_missing';
      } else {
        log(`❌ Error de conexión: ${error.message}`, 'red');
        return false;
      }
    }

    const count = data || 0;
    log(`✅ Conexión exitosa! Registros en waitlist: ${count}`, 'green');

    // Test insert capability (this will fail with RLS, which is expected)
    log('\n🔐 Probando políticas de seguridad...', 'cyan');
    const testEmail = `test_${Date.now()}@example.com`;
    
    const { error: insertError } = await supabase
      .from('waitlist_registrations')
      .insert({ 
        full_name: 'Test User',
        email: testEmail,
        country: 'CO',
        company_name: 'Test Company',
        industry_id: '46b69971-0e17-4720-aa27-adb532d96b8c',
        company_size: '1-10',
        chatbot_type: 'soporte',
        expected_volume: 'bajo'
      });

    if (insertError) {
      if (insertError.message.includes('new row violates row-level security policy')) {
        log('⚠️  RLS activo (correcto para seguridad)', 'yellow');
        log('   Las políticas están funcionando correctamente', 'yellow');
      } else {
        log(`⚠️  Error inesperado: ${insertError.message}`, 'yellow');
      }
    } else {
      log('✅ Insert test exitoso', 'green');
      // Clean up test data
      await supabase.from('waitlist_registrations').delete().eq('email', testEmail);
    }

    log('\n🎉 Verificación completada exitosamente!', 'green');
    log('=' .repeat(50), 'blue');
    log('El proyecto está listo para usar Supabase Cloud', 'green');
    return true;

  } catch (err) {
    log(`❌ Error inesperado: ${err.message}`, 'red');
    log('   Verifica que las credenciales sean correctas', 'yellow');
    return false;
  }
}

// Project information
function showProjectInfo() {
  log('\n📋 Información del Proyecto Supabase', 'magenta');
  log('=' .repeat(50), 'blue');
  log('Proyecto: NeurAnt Landing Page', 'cyan');
  log('Project ID: fdhrpeppevlbhzttgutx', 'cyan');
  log('Tipo: Cloud-only (sin configuración local)', 'cyan');
  log('Puerto de desarrollo: 3002', 'cyan');
}

// Main execution
async function main() {
  showProjectInfo();
  
  const result = await verifySupabaseConnection();
  
  if (result === true) {
    log('\n✅ Todo está configurado correctamente!', 'green');
    process.exit(0);
  } else if (result === 'table_missing') {
    log('\n⚠️  Configuración parcial - crear tabla waitlist_registrations', 'yellow');
    process.exit(1);
  } else {
    log('\n❌ Hay problemas de configuración', 'red');
    process.exit(1);
  }
}

// Handle errors
process.on('unhandledRejection', (err) => {
  log(`❌ Error no manejado: ${err.message}`, 'red');
  process.exit(1);
});

// Run verification
if (require.main === module) {
  main();
}

module.exports = { verifySupabaseConnection };