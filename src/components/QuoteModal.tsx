import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { QuoteFormData } from '../types';
import { SERVICES, BUSINESS_INFO } from '../data/mockData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  prefilledLotSize?: string;
  prefilledPrice?: string;
  onSubmitSuccess: (data: QuoteFormData) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  prefilledLotSize,
  prefilledPrice,
  onSubmitSuccess,
}) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    serviceCategory: preselectedService || 'Precision Lawn Mowing & Edging',
    propertyType: 'Residential Single-Family',
    lotSize: prefilledLotSize || 'Under 1/2 Acre (Standard Suburban)',
    timing: 'Next Available Opening',
    notes: prefilledPrice ? `Estimated budget target: ${prefilledPrice}` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof QuoteFormData, string>>>({});

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, serviceCategory: preselectedService }));
    }
    if (prefilledLotSize) {
      setFormData((prev) => ({ ...prev, lotSize: prefilledLotSize }));
    }
    if (prefilledPrice) {
      setFormData((prev) => ({
        ...prev,
        notes: `Estimated price benchmark: ${prefilledPrice}${prev.notes ? ` · ${prev.notes}` : ''}`,
      }));
    }
  }, [preselectedService, prefilledLotSize, prefilledPrice]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Partial<Record<keyof QuoteFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim() && !formData.email.trim()) {
      errs.phone = 'Please provide a phone number or email address';
    }
    if (formData.phone && !/^[0-9()+\-\s.]{7,20}$/.test(formData.phone)) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
    onSubmitSuccess(formData);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="bg-white rounded-2xl border border-[#133824]/20 shadow-2xl max-w-lg w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="bg-[#FAFBF9] px-6 py-4 border-b border-[#133824]/10 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#133824]">
              Request Free Estimate
            </h3>
            <p className="text-xs text-[#4A6354]">
              Guaranteed 24-hour response · Zero obligation
            </p>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="p-1.5 text-[#133824] hover:bg-[#133824]/10 rounded-lg transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-[#133824]">
                Thank You, {formData.fullName}!
              </h4>
              <p className="text-xs sm:text-sm text-[#2C4A38]/90">
                We received your request for <span className="font-semibold">{formData.serviceCategory}</span>. A route specialist will inspect your property specifications and text/email your itemized quote within 24 hours.
              </p>
              <div className="p-3.5 bg-[#FAFBF9] rounded-xl border border-[#133824]/10 text-xs text-left space-y-1">
                <p className="font-bold text-[#133824]">Need faster service?</p>
                <p>Call our dispatch team directly at <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="font-bold underline text-[#133824]">{BUSINESS_INFO.phone}</a>.</p>
              </div>
              <button
                type="button"
                onClick={handleResetAndClose}
                className="w-full py-3 text-xs sm:text-sm font-bold text-white bg-[#133824] hover:bg-[#1B4D31] rounded-xl shadow cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {prefilledPrice && (
                <div className="p-3 bg-[#E6C65C]/15 border border-[#B8860B]/30 rounded-xl text-xs text-[#133824] flex items-center justify-between">
                  <span>Selected Estimate: <strong>{prefilledPrice}</strong></span>
                  <span className="text-[11px] text-[#B8860B] font-bold">Applied</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#133824] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rachel Adams"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#133824]/20 rounded-lg text-[#133824] focus-ring"
                />
                {errors.fullName && (
                  <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#133824] mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="(555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#133824]/20 rounded-lg text-[#133824] focus-ring"
                  />
                  {errors.phone && (
                    <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#133824] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="rachel@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#133824]/20 rounded-lg text-[#133824] focus-ring"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#133824] mb-1">
                  Property Street Address
                </label>
                <input
                  type="text"
                  placeholder="Street address & zip code"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-[#FAFBF9] border border-[#133824]/20 rounded-lg text-[#133824] focus-ring"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#133824] mb-1">
                    Service Needed
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm bg-[#FAFBF9] border border-[#133824]/20 rounded-lg text-[#133824] focus-ring"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Full Seasonal Yard Care">Full Seasonal Package</option>
                    <option value="Commercial Grounds Contract">Commercial Property Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#133824] mb-1">
                    Approximate Lot Size
                  </label>
                  <select
                    value={formData.lotSize}
                    onChange={(e) => setFormData({ ...formData, lotSize: e.target.value })}
                    className="w-full px-3 py-2.5 text-sm bg-[#FAFBF9] border border-[#133824]/20 rounded-lg text-[#133824] focus-ring"
                  >
                    <option value="Townhome / Small Lawn (< 3,000 sq ft)">Townhome / Small Yard</option>
                    <option value="Under 1/2 Acre (Standard Suburban)">Under 1/2 Acre (Standard)</option>
                    <option value="1/2 to 1 Acre">1/2 to 1 Acre</option>
                    <option value="1+ Acre Estate / Commercial Lot">1+ Acre / Commercial</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#133824] mb-1">
                  Specific Requests or Access Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Gate location, sprinkler heads, dog in yard, preferred contact time..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm bg-[#FAFBF9] border border-[#133824]/20 rounded-lg text-[#133824] focus-ring"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 text-sm font-bold text-white bg-[#133824] hover:bg-[#1B4D31] active:scale-[0.99] rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Submit Estimate Request</span>
                <ArrowRight className="w-4 h-4 text-[#E6C65C]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#4A6354]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Your information is strictly protected and never shared.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
