(function ($) {
    $.fn.countTo = function (options) {
      options = options || {};
  
      return $(this).each(function () {
        var settings = $.extend(
          {},
          $.fn.countTo.defaults,
          {
            from: $(this).data("from"),
            to: $(this).data("to"),
            speed: $(this).data("speed"),
            refreshInterval: $(this).data("refresh-interval"),
            decimals: $(this).data("decimals")
          },
          options
        );
        var loops = Math.ceil(settings.speed / settings.refreshInterval),
          increment = (settings.to - settings.from) / loops;
        var self = this,
          $self = $(this),
          loopCount = 0,
          value = settings.from,
          data = $self.data("countTo") || {};
        $self.data("countTo", data);
        if (data.interval) {
          clearInterval(data.interval);
        }
        data.interval = setInterval(updateTimer, settings.refreshInterval);
        render(value);
  
        function updateTimer() {
          value += increment;
          loopCount++;
  
          render(value);
  
          if (typeof settings.onUpdate == "function") {
            settings.onUpdate.call(self, value);
          }
  
          if (loopCount >= loops) {
            $self.removeData("countTo");
            clearInterval(data.interval);
            value = settings.to;
  
            if (typeof settings.onComplete == "function") {
              settings.onComplete.call(self, value);
            }
          }
        }
  
        function render(value) {
          var formattedValue = settings.formatter.call(self, value, settings);
          $self.html(formattedValue);
        }
      });
    };
  
    $.fn.countTo.defaults = {
      from: 0, // the number the element should start at
      to: 0, // the number the element should end at
      speed: 1000, // how long it should take to count between the target numbers
      refreshInterval: 100, // how often the element should be updated
      decimals: 0, // the number of decimal places to show
      formatter: formatter,
      onUpdate: null,
      onComplete: null
    };
  
    function formatter(value, settings) {
      return value.toFixed(settings.decimals);
    }
  })(jQuery);
  
  jQuery(function ($) {
    $(".count-number").data("countToOptions", {
      formatter: function (value, options) {
        return value
          .toFixed(options.decimals)
          .replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
      }
    });
    $(".timer").each(count);
  
    function count(options) {
      var $this = $(this);
      options = $.extend({}, options || {}, $this.data("countToOptions") || {});
      $this.countTo(options);
    }
  });
  