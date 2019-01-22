unless Rails.env.test?
  def creating(message)
    return unless Rails.env.development?
    puts "Creating #{message}..."
  end

  def display_result(record, success_message)
    return unless Rails.env.development?
    show_details = Figaro.env.show_details.present?
    success = record.errors.empty?

    if show_details
      status = success ? '[ DONE ]'.green : '[FAILED]'.red
      puts "#{status} #{success_message}"
    else
      print success ? "\u2713".green : "\u2717".red
    end

    if !success
      puts "[ERROR ] #{record.errors.to_a}" if show_details
      @error_count ||= 0
      @error_count += 1
    end
  end

  def report_status
    report = @error_count.blank? ? "All good! No failures!" : "There were #{@error_count.to_s.red} failures."
    puts ""
    puts report
    puts ""
  end

  get_order = -> (text) {text.match(/_(\d+)\.rb$/)[1].to_i}
  compare_order = -> (a, b) {get_order.call(a) <=> get_order.call(b)}
  files = Dir[File.join(Rails.root, 'db/seeds', '**', '*.rb')]
  load = -> (file) {load file}
  files.sort(&compare_order).each(&load)
end
