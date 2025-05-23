
import React from "react";
import { X, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ProductFeaturesProps {
  product: any;
  competitiveProducts: any[];
  onAddCompetitor: (competitor: any) => void;
  onRemoveCompetitor: (competitorId: string) => void;
}

const ProductFeatures = ({ 
  product,
  competitiveProducts,
  onAddCompetitor,
  onRemoveCompetitor
}: ProductFeaturesProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Feature Breakdown</h2>
        <p className="text-sm text-muted-foreground">Detailed analysis of product capabilities</p>
      </div>

      {/* Feature breakdowns */}
      <div className="space-y-5">
        {product.features.map((feature: any, index: number) => (
          <div key={index} className="bg-muted/20 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{feature.name}</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{feature.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
            
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium">Performance Score</span>
                <span className="text-xs font-medium">{feature.score}/10</span>
              </div>
              <div className="w-full bg-muted h-2 rounded-full">
                <div 
                  className={`h-2 rounded-full ${getScoreColorClass(feature.score)}`}
                  style={{ width: `${feature.score * 10}%` }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">{getScoreDescription(feature.score)}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Competitive products section */}
      {competitiveProducts.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Competitive Analysis</h3>
            <span className="text-xs text-muted-foreground">{competitiveProducts.length} competitor{competitiveProducts.length !== 1 ? 's' : ''}</span>
          </div>
          
          {competitiveProducts.map((competitor) => (
            <div key={competitor.id} className="bg-muted/20 rounded-lg p-4 relative border border-border/50">
              <button
                onClick={() => onRemoveCompetitor(competitor.id)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded overflow-hidden border border-border/50">
                  <img
                    src={competitor.image}
                    alt={competitor.name}
                    className="h-10 w-10 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      const category = competitor.category?.toLowerCase() || '';
                      if (category.includes('phone')) {
                        target.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b";
                      } else {
                        target.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
                      }
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-medium">{competitor.name}</h4>
                  <p className="text-xs text-muted-foreground">{competitor.category}</p>
                </div>
                <div className="ml-auto text-sm font-medium">${competitor.price}</div>
              </div>
              
              <div className="space-y-3">
                {competitor.features.map((feature: any, idx: number) => (
                  <div key={idx} className="text-sm">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{feature.name}</span>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">{feature.score}/10</span>
                        {compareFeatureScore(feature, product.features.find((f: any) => f.name === feature.name))}
                      </div>
                    </div>
                    <div className="w-full bg-muted h-1.5 rounded-full">
                      <div 
                        className={`h-1.5 rounded-full ${getScoreColorClass(feature.score)}`}
                        style={{ width: `${feature.score * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Helper functions for score visualization
const getScoreColorClass = (score: number): string => {
  if (score >= 8) return 'bg-green-500';
  if (score >= 6) return 'bg-blue-500';
  if (score >= 4) return 'bg-amber-500';
  return 'bg-red-500';
};

const getScoreDescription = (score: number): string => {
  if (score >= 9) return 'Outstanding performance';
  if (score >= 8) return 'Excellent performance';
  if (score >= 7) return 'Very good performance';
  if (score >= 6) return 'Good performance';
  if (score >= 5) return 'Average performance';
  if (score >= 4) return 'Below average';
  if (score >= 3) return 'Poor performance';
  return 'Inadequate performance';
};

const compareFeatureScore = (competitorFeature: any, mainFeature: any | undefined) => {
  if (!mainFeature) return null;
  
  const diff = competitorFeature.score - mainFeature.score;
  
  if (diff > 0) {
    return <span className="text-green-500 text-xs">+{diff}</span>;
  } else if (diff < 0) {
    return <span className="text-red-500 text-xs">{diff}</span>;
  } else {
    return <span className="text-muted-foreground text-xs">±0</span>;
  }
};

export default ProductFeatures;
