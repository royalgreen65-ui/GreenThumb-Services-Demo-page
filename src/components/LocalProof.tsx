import React from 'react';
import { Star, CheckCircle, MapPin, Quote } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../data/mockData';

export const LocalProof: React.FC = () => {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAFBF9] border-b border-[#133824]/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-wider text-[#B8860B] mb-2">
              Verified Local Reviews
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#133824] tracking-tight text-balance">
              Trusted by over {BUSINESS_INFO.servedCount} local families and property managers.
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#2C4A38]/90">
              Read authentic feedback from homeowners in your immediate neighborhood.
            </p>
          </div>

          {/* Social Proof Aggregate Metric */}
          <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-[#133824]/15 shadow-sm self-start md:self-auto">
            <div className="text-3xl font-extrabold text-[#133824] tabular-nums">
              5.0
            </div>
            <div>
              <div className="flex text-[#B8860B]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-[#2C4A38]/80 mt-0.5">
                Over 280+ 5-star Google & local reviews
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-[#133824]/15 p-6 sm:p-7 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Review Header: Author, Rating, Neighborhood */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-[#133824]">
                      {review.author}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-[#4A6354] mt-0.5">
                      <span className="flex items-center gap-1 font-medium text-[#133824]">
                        <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                        {review.neighborhood}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{review.serviceReceived}</span>
                    </div>
                  </div>

                  <div className="flex text-[#B8860B] shrink-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {/* Review Quote */}
                <p className="text-sm text-[#2C4A38] leading-relaxed italic">
                  "{review.quote}"
                </p>

              </div>

              {/* Concrete Attributable Outcome */}
              <div className="mt-5 pt-4 border-t border-[#133824]/10 flex items-center justify-between text-xs">
                <span className="font-semibold text-[#133824] flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{review.outcome}</span>
                </span>
                <span className="text-[#4A6354]">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Local Guarantee Card */}
        <div className="mt-12 bg-white rounded-2xl border border-[#133824]/15 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-[#133824]">
              The GreenThumb 100% Satisfaction Guarantee
            </h4>
            <p className="text-xs sm:text-sm text-[#2C4A38]/90 max-w-2xl">
              If any aspect of your lawn cut or landscaping does not match our mutual agreement, notify us within 24 hours. A supervisor will return to re-cut or adjust your property free of charge.
            </p>
          </div>
          <div className="text-center sm:text-right shrink-0">
            <span className="text-xs uppercase font-bold tracking-wider text-[#B8860B]">
              Reliability Promise
            </span>
            <p className="text-sm font-extrabold text-[#133824]">
              Zero Hassle Fixes
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
