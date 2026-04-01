import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import { formatToINR } from 'src/utils/format-number';
import { fDateTime12hr } from 'src/utils/format-time';

// ----------------------------------------------------------------------

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  logo: {
    width: 60,
    height: 60,
    backgroundColor: '#eee', // Placeholder for logo
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212B36',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoCol: {
    width: '45%',
  },
  label: {
    fontSize: 9,
    color: '#919EAB',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  value: {
    fontSize: 11,
    fontWeight: 'medium',
  },
  table: {
    width: '100%',
    marginVertical: 40,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F6F8',
    paddingVertical: 12,
    alignItems: 'center',
  },
  tableHeader: {
    backgroundColor: '#F4F6F8',
    borderBottomWidth: 0,
  },
  col1: { width: '40%' },
  col2: { width: '20%', textAlign: 'center' },
  col3: { width: '20%', textAlign: 'right' },
  col4: { width: '20%', textAlign: 'right' },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  totalLabel: {
    width: 100,
    textAlign: 'right',
    color: '#919EAB',
    paddingRight: 10,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
    fontWeight: 'medium',
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212B36',
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#F4F6F8',
    paddingTop: 10,
    textAlign: 'center',
    color: '#919EAB',
    fontSize: 9,
  },
});

export default function InvoicePDF({ order }) {
  const subtotal = order?.subtotal || 0;
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logo} />
          <View>
            <Text style={styles.title}>INVOICE</Text>
            <Text style={{ textAlign: 'right', marginTop: 10 }}>#{order?.order_number}</Text>
          </View>
        </View>

        {/* Info Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Invoice To</Text>
            <Text style={styles.value}>{order?.user?.first_name} {order?.user?.last_name}</Text>
            <Text style={{ marginTop: 4 }}>{order?.user_address?.address_line1}</Text>
            <Text>{order?.user_address?.city}, {order?.user_address?.state}, {order?.user_address?.country}</Text>
            <Text>{order?.user_address?.pincode}</Text>
            <Text>{order?.user_address?.phone}</Text>
          </View>
          <View style={styles.infoCol}>
            <Text style={styles.label}>Date Issued</Text>
            <Text style={styles.value}>{fDateTime12hr(order?.createdAt)}</Text>
            <Text style={[styles.label, { marginTop: 10 }]}>Payment Status</Text>
            <Text style={styles.value}>{order?.payment_status}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.col1, styles.label]}>Description</Text>
            <Text style={[styles.col2, styles.label]}>Qty</Text>
            <Text style={[styles.col3, styles.label]}>Price</Text>
            <Text style={[styles.col4, styles.label]}>Total</Text>
          </View>

          {order?.order_items?.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.col1}>
                <Text style={{ fontWeight: 'medium' }}>{item?.product?.product_name}</Text>
                <Text style={{ fontSize: 8, color: '#919EAB', marginTop: 4 }}>
                  SKU: {item?.product_variant?.sku} - {item?.product_variant?.variant_name} ({item?.product_variant?.variant_value})
                </Text>
              </View>
              <Text style={styles.col2}>{item.quantity}</Text>
              <Text style={styles.col3}>{formatToINR(item.price)}</Text>
              <Text style={styles.col4}>{formatToINR(item.price * item.quantity)}</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>{formatToINR(subtotal)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Shipping</Text>
          <Text style={styles.totalValue}>{formatToINR(order?.delivery || 0)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Discount</Text>
          <Text style={[styles.totalValue, { color: '#E53935' }]}>-{formatToINR(order?.discount || 0)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>GST Tax</Text>
          <Text style={styles.totalValue}>{formatToINR(order?.gst_tax || 0)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Packing</Text>
          <Text style={styles.totalValue}>{formatToINR(order?.packing || 0)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={[styles.totalValue, styles.grandTotal]}>{formatToINR(order?.final_amount)}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          <Text style={{ marginTop: 4 }}>If you have any questions, please contact support@zafe.com</Text>
        </View>
      </Page>
    </Document>
  );
}
