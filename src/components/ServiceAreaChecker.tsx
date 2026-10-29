import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { NEIGHBORHOODS, BUSINESS_INFO } from '../data/mockData';

export const ServiceAreaChecker: React.FC<{ onOpenQuoteModal: () => void }> = ({ onOpenQuoteModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);

  const matchedArea = NEIGHBORHOODS.find(
    (n) =>
      n.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      n.zip.includes(searchTerm.trim())
  );

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setSearched(true);
  };

  return (
    <section id="service-area" className="py-16 sm:py-24 bg-white border-b border-[#133824]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">
            Local Route Coverage
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#133824] tracking-tight text-balance">
            Check if our crews are currently in your neighborhood.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#2C4A38]/90">
            We operate structured weekly routes across Springfield and surrounding communities to guarantee punctual arrival times and consistent service.
          </p>
        </div>

        {/* Interactive Zip / Neighborhood Search Tool */}
        <div className="bg-[#FAFBF9] rounded-2xl border border-[#133824]/15 p-6 sm:p-8 shadow-sm mb-12">
          <form onSubmit={handleCheck} className="max-w-2xl">
            <label className="block text-xs font-bold text-[#133824] mb-2 uppercase tracking-wider">
              Enter Your Zip Code or Subdivision Name:
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-[#4A6354] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="e.g. 62704, Oakridge Estates, Greenfield Manor..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSearched(false);
                  }}
                  className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-[#133824]/20 rounded-xl text-[#133824] placeholder:text-[#4A6354]/60 focus-ring"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 text-sm font-bold text-white bg-[#133824] hover:bg-[#1B4D31] rounded-xl shadow transition-all cursor-pointer whitespace-nowrap"
              >
                Check Coverage
              </button>
            </div>
          </form>

          {/* Search result feedback */}
          {searched && (
            <div className="mt-5 p-4 rounded-xl border animate-in fade-in duration-200">
              {matchedArea ? (
                <div className="flex items-start gap-3 bg-emerald-50/80 border-emerald-200 p-4 rounded-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-emerald-950">
                    <p className="font-bold text-emerald-900">
                      Great news! We service {matchedArea.name} ({matchedArea.zip}).
                    </p>
                    <p className="mt-1">
                      Our active route operates on <span className="font-semibold">{matchedArea.routeDays}</span>. We can onboard your property for next week's schedule immediately.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenQuoteModal}
                      className="mt-3 inline-flex items-center gap-1.5 font-bold text-xs text-white bg-emerald-800 hover:bg-emerald-900 px-3 py-1.5 rounded-lg shadow-sm"
                    >
                      <span>Claim Your Route Slot Now</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-3 bg-amber-50/80 border-amber-200 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-amber-950">
                    <p className="font-bold text-amber-900">
                      Nearby route available!
                    </p>
                    <p className="mt-1">
                      We routinely expand routes for adjacent properties. Call us directly at <a href={`tel:${BUSINESS_INFO.phoneClean}`} className="font-bold underline">{BUSINESS_INFO.phone}</a> to confirm crew availability for your street.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Active Neighborhood Route Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NEIGHBORHOODS.map((item) => (
            <div
              key={item.name}
              className="p-4 bg-white rounded-xl border border-[#133824]/10 hover:border-[#133824]/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#4A6354] mb-1">
                  <span>Zip {item.zip}</span>
                  <span className="font-semibold text-emerald-700">Active Route</span>
                </div>
                <h3 className="font-bold text-sm text-[#133824]">
                  {item.name}
                </h3>
              </div>

              <div className="mt-3 pt-3 border-t border-[#133824]/5 flex items-center gap-1.5 text-xs text-[#2C4A38]/80">
                <Clock className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{item.routeDays}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
