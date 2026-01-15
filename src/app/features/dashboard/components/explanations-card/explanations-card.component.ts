import { Component, input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-directive-card',
  templateUrl: './explanations-card.component.html',
})
export default class DirectiveCardComponent implements AfterViewInit {
  
  // Inputs
  title = input.required<string>();
  directiveName = input.required<string>();
  description = input.required<string>();
  themeColor = input.required<'purple' | 'sky' | 'orange' | 'emerald' | 'lime' | 'cyan'>();
  codeExample = input.required<string>();
  fileName = input.required<string>();
  footerLabel = input.required<string>();
  footerValue = input.required<string>();

  ngAfterViewInit() {
    import('highlight.js').then((hljs) => {
      document.querySelectorAll('pre code').forEach((block) => {
        hljs.default.highlightElement(block as HTMLElement);
      });
    });
  }

  getThemeClasses() {
    const color = this.themeColor();
    return {
      gradient: `theme-${color}-gradient`,
      icon: `theme-${color}-icon`,
      bgGradient: `theme-${color}-bg`,
      text: `theme-${color}-text`,
      dot: `theme-${color}-dot`,
      dotShadow: `theme-${color}-dot-shadow`,
    };
  }
}
